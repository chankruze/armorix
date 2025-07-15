import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router";
import routes from "@/routes";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { loadWeapon, updateWeapon } from "@/services/weapon-service";

const weaponSchema = z.object({
  serial: z.string().min(1, "Serial is required"),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  image: z.string().url("Must be a valid URL"),
  price: z.string().min(1, "Price is required"),
  qualities: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  stats: z.object({
    damage: z.number().min(0, "Min 0").max(100, "Max 100"),
    accuracy: z.number().min(0, "Min 0").max(100, "Max 100"),
    fireRate: z.number().min(0, "Min 0").max(100, "Max 100"),
    mobility: z.number().min(0, "Min 0").max(100, "Max 100"),
    range: z.number().min(0, "Min 0").max(100, "Max 100"),
  }),
  attachments: z.string().optional(),
});

type WeaponFormValues = z.infer<typeof weaponSchema>;

export default function EditWeapon() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WeaponFormValues>({
    resolver: zodResolver(weaponSchema),
  });

  const onSubmit = async (data: WeaponFormValues) => {
    const updatedWeapon = {
      ...data,
      qualities: data.qualities
        ? data.qualities.split(",").map((q) => q.trim())
        : [],
      attachments: data.attachments
        ? data.attachments.split(",").map((a) => a.trim())
        : [],
    };

    try {
      await updateWeapon(id!, updatedWeapon);
      console.log("Weapon updated");
      navigate(routes.admin.weapons.weapon.index.path(id!));
    } catch (error) {
      console.error("Failed to update weapon:", error);
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchWeapon = async () => {
      try {
        const weapon = await loadWeapon(id);

        reset({
          serial: weapon.serial,
          name: weapon.name,
          type: weapon.type,
          image: weapon.image,
          price: weapon.price,
          qualities: weapon.qualities?.join(", "),
          description: weapon.description,
          stats: {
            damage: weapon.stats.damage,
            accuracy: weapon.stats.accuracy,
            fireRate: weapon.stats.fireRate,
            mobility: weapon.stats.mobility,
            range: weapon.stats.range,
          },
          attachments: weapon.attachments?.join(", "),
        });

        setLoading(false);
      } catch (error) {
        console.error("Failed to load weapon:", error);
        setLoading(false);
      }
    };

    fetchWeapon();
  }, [id, reset]);

  if (loading) {
    return <div className="p-6 text-center">Loading weapon data...</div>;
  }

  return (
    <div className="p-6">
      <form
        id="weapon-edit-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto p-6"
      >
        {/* Serial */}
        <div className="space-y-2">
          <Label>Serial</Label>
          <Input
            {...register("serial")}
            placeholder="WPN-001"
            className={clsx(
              "border-neutral-700",
              errors.serial && "border-red-500",
            )}
          />
          {errors.serial && (
            <p className="text-red-400">{errors.serial.message}</p>
          )}
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            {...register("name")}
            placeholder="M4A1"
            className={clsx(
              "border-neutral-700",
              errors.name && "border-red-500",
            )}
          />
          {errors.name && <p className="text-red-400">{errors.name.message}</p>}
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Input
            {...register("type")}
            placeholder="Assault Rifle"
            className={clsx(
              "border-neutral-700",
              errors.type && "border-red-500",
            )}
          />
          {errors.type && <p className="text-red-400">{errors.type.message}</p>}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input
            {...register("image")}
            placeholder="https://example.com/image.jpg"
            className={clsx(
              "border-neutral-700",
              errors.image && "border-red-500",
            )}
          />
          {errors.image && (
            <p className="text-red-400">{errors.image.message}</p>
          )}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            {...register("price")}
            placeholder="$1200"
            className={clsx(
              "border-neutral-700",
              errors.price && "border-red-500",
            )}
          />
          {errors.price && (
            <p className="text-red-400">{errors.price.message}</p>
          )}
        </div>

        {/* Qualities */}
        <div className="space-y-2">
          <Label>Qualities (comma-separated)</Label>
          <Input
            {...register("qualities")}
            placeholder="Lightweight, Durable"
            className="border-neutral-700"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-2">
          <Label>Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Advanced combat rifle used in multiple military operations."
            rows={3}
            className={clsx(
              "border-neutral-700",
              errors.description && "border-red-500",
            )}
          />
          {errors.description && (
            <p className="text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <Label>Damage</Label>
          <Input
            type="number"
            {...register("stats.damage", { valueAsNumber: true })}
            placeholder="75"
            min={0}
            max={100}
            className={clsx(
              "border-neutral-700",
              errors.stats?.damage && "border-red-500",
            )}
          />
          {errors.stats?.damage && (
            <p className="text-red-400">{errors.stats.damage.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Accuracy</Label>
          <Input
            type="number"
            {...register("stats.accuracy", { valueAsNumber: true })}
            placeholder="85"
            min={0}
            max={100}
            className={clsx(
              "border-neutral-700",
              errors.stats?.accuracy && "border-red-500",
            )}
          />
          {errors.stats?.accuracy && (
            <p className="text-red-400">{errors.stats.accuracy.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Fire Rate</Label>
          <Input
            type="number"
            {...register("stats.fireRate", { valueAsNumber: true })}
            placeholder="90"
            min={0}
            max={100}
            className={clsx(
              "border-neutral-700",
              errors.stats?.fireRate && "border-red-500",
            )}
          />
          {errors.stats?.fireRate && (
            <p className="text-red-400">{errors.stats.fireRate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Mobility</Label>
          <Input
            type="number"
            {...register("stats.mobility", { valueAsNumber: true })}
            placeholder="70"
            min={0}
            max={100}
            className={clsx(
              "border-neutral-700",
              errors.stats?.mobility && "border-red-500",
            )}
          />
          {errors.stats?.mobility && (
            <p className="text-red-400">{errors.stats.mobility.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Range</Label>
          <Input
            type="number"
            {...register("stats.range", { valueAsNumber: true })}
            placeholder="60"
            min={0}
            max={100}
            className={clsx(
              "border-neutral-700",
              errors.stats?.range && "border-red-500",
            )}
          />
          {errors.stats?.range && (
            <p className="text-red-400">{errors.stats.range.message}</p>
          )}
        </div>

        {/* Attachments */}
        <div className="md:col-span-2 space-y-2">
          <Label>Attachments (comma-separated)</Label>
          <Input
            {...register("attachments")}
            placeholder="Scope, Laser Sight, Extended Mag"
            className="border-neutral-700"
          />
        </div>
      </form>
    </div>
  );
}
