import { useSnackbar } from 'notistack';

const NotificationService = ({notification}) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    if (notification.msg !== null) {
        console.log(notification);
        enqueueSnackbar(notification.msg, {
            variant: notification.type
        });
    }

    return (
        <></>
    )
}

export {NotificationService}