import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";
import { insertWeapon } from "@/services/weapon-service";
import { useNavigate } from "react-router";
import routes from "@/routes";
import { Weapon } from "@/types/weapon";
import { useHeader } from "@/contexts/header-context";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

async function createWeapon(
  values: WeaponFormValues,
  onSuccess: (newWeaponId: string) => void,
) {
  const weapon: Omit<Weapon, "_id"> = {
    ...values,
    qualities: values.qualities
      ? values.qualities.split(",").map((q) => q.trim())
      : [],
    attachments: values.attachments
      ? values.attachments.split(",").map((a) => a.trim())
      : [],
  };

  try {
    const newWeaponId = await insertWeapon(weapon);
    console.log("Weapon created with ID:", newWeaponId);
    onSuccess(newWeaponId);
  } catch (error) {
    console.error("Failed to create weapon:", error);
  }
}

export default function NewWeapon() {
  const navigate = useNavigate();
  const { setHeaderProps } = useHeader();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WeaponFormValues>({
    resolver: zodResolver(weaponSchema),
    defaultValues: {
      serial: "WPN-TEST-001",
      name: "M4A1 Test",
      type: "Assault Rifle",
      image: "https://example.com/weapon.png",
      price: "1500",
      qualities: "Lightweight, Reliable, Low Recoil",
      description:
        "Test weapon for quick form submission. Used in modern combat scenarios.",
      stats: {
        damage: 75,
        accuracy: 85,
        fireRate: 90,
        mobility: 70,
        range: 60,
      },
      attachments: "Scope, Laser Sight, Extended Mag",
    },
  });

  const onSubmit = async (data: WeaponFormValues) => {
    await createWeapon(data, (newWeaponId) => {
      navigate(routes.admin.weapons.weapon.index.path(newWeaponId));
    });
  };

  useEffect(() => {
    setHeaderProps({
      title: "Add New Weapon",
      showBack: true,
      showSave: true,
      showNew: false,
      onSave: handleSubmit(onSubmit),
    });

    return () => {
      setHeaderProps({});
    };
  }, []);

  return (
    <div className="p-6">
      <form
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
