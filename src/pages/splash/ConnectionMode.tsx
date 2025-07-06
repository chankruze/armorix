import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";

export default function ConnectionMode({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedMode, setSelectedMode] = useState("online");

  const handleSave = () => {
    console.log("Selected DB Mode:", selectedMode);
    invoke("set_db_mode", { mode: selectedMode });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Database connection mode</DialogTitle>
          <DialogDescription>
            Choose how you want your data to be stored and accessed. You can
            always change this later in the settings.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedMode}
            onValueChange={setSelectedMode}
            className="space-y-2"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="online" id="online" />
              <div>
                <Label htmlFor="online">Online (MongoDB Atlas)</Label>
                <p className="text-gray-500 text-sm">
                  Connect to a cloud database and sync across devices.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="offline" id="offline" />
              <div>
                <Label htmlFor="offline">Offline (Local SQLite)</Label>
                <p className="text-gray-500 text-sm">
                  Store data only on this device. No internet needed.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="lan" id="lan" />
              <div>
                <Label htmlFor="lan">LAN (Custom Host)</Label>
                <p className="text-gray-500 text-sm">
                  Connect to a local database on your local network.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
