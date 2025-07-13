import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { createQr, saveQr } from "@/utils/qr";
import { useState, useEffect } from "react";

interface QRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serial: string;
}

export function QRDialog({ open, onOpenChange, serial }: QRDialogProps) {
  const [qr, setQr] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const showQr = async () => {
    setIsLoading(true);
    const _qr = await createQr(serial);
    setQr(_qr);
    setIsLoading(false);
  };

  const downloadQr = async () => {
    const path = await saveQr(serial);
    console.log(`QR saved to: ${path}`);
    // TODO: Optionally show toast or feedback
  };

  useEffect(() => {
    if (open) {
      showQr();
    } else {
      setQr("");
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{serial}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col items-center space-y-3">
            {isLoading ? (
              <p>Loading QR...</p>
            ) : qr ? (
              <img src={qr} alt="QR Code" />
            ) : (
              <p>No QR available</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={downloadQr}>
            Download QR
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
