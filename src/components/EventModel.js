import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const handleClose = () => {
        props.setOpen(false)
    };

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={props.open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">{props.event.title}</h2>
                    <p id="simple-modal-description">
                        {`Description: ${props.event.description || 'none'}`}
                    </p>
                    <p id="simple-modal-description">
                        {`Date: ${new Date(props.event.date).toLocaleDateString()}`}
                    </p>
                    <p id="simple-modal-description">
                        {`Type: ${props.event.type}`}
                    </p>
                </div>
            </Modal>
        </div>
    );
}
