import { toast } from "sonner";

const DEFAULT_DURATION = 2500;

export const notify = {
  success: (message: string, description?: string) =>
    toast.success(message, { description, duration: DEFAULT_DURATION }),
  error: (message: string, description?: string) =>
    toast.error(message, { description, duration: DEFAULT_DURATION }),
  info: (message: string, description?: string) =>
    toast(message, { description, duration: DEFAULT_DURATION }),
};

