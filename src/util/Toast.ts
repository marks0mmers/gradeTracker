import { toast } from "react-toastify";

class ToastInstance {
    public success(message: string) {
        toast.success(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    public info(message: string) {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    public error(message: string): true {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
        return true;
    }
}

export const Toast = new ToastInstance();
