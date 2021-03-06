import {
    Grid, Typography, IconButton
} from '@mui/material';

import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';

const GridDragAndDrop = styled(Grid)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    borderRadius: theme.spacing(1),
    zIndex: 3,
    [theme.breakpoints.down('md')]: {
        marginRight: 0,
        marginLeft: 0,
    },
    '&.onDragging': {
        backgroundColor: '#eeeeee',
        filter: 'brightness(0.5)'
    }
}));

const Input = styled('input')({
    display: 'none',
});

const UploadComponent = ({
    setData, setFileName, setSize, containerProps, CustomIcon,
    showDelete, stylesImage, stylesImage2,
    clickWhole, showIconUpload, data,
    isFormik, getFileSize, helperText,
    onError, NextImage, React
}) => {
    const [dragging, setDragging] = React.useState(false);
    const [loadingImage, setLoadingImage] = React.useState(false);
    const [photo, setPhoto] = React.useState('');

    const upLoadRef = React.useRef(null);
    
    React.useEffect(() => {
        if (data) {
            setPhoto(data);
        };
    }, [data]);

    const handleChange = (e) => {
        // console.log(e.target.value);
        if (e.target.files && e.target.files[0] && !e.target.files[0].type.includes('image/')) {
            if (onError && typeof onError === 'function') {
                onError();
            }
            return;
        }
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            const fileName = e.target.files[0].name;
            const file = e.target.files[0];
            reader.onload = async (e) => {
                setPhoto(e.target.result);
                setLoadingImage(true);
                if (setFileName) {
                    setFileName(fileName);
                }
                if (setSize) {
                    const newImg = new window.Image();
                    newImg.src = e.target.result;
                    newImg.onload = function () {
                        setSize({ width: this.width, height: this.height });
                    }
                }
                if (setData) {
                    if (isFormik) {
                        setData(file, e.target.result);
                    } else {
                        setData(e.target.result);
                    }
                }
                if (getFileSize) {
                    getFileSize(file?.size);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const dropHandler = (ev) => {
        setDragging(false);

        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    var file = ev.dataTransfer.items[i].getAsFile();
                    if (file.type.includes('image/')) {
                        let reader = new FileReader();
                        reader.onload = async (e) => {
                            setPhoto(e.target.result);
                            setLoadingImage(true);
                            if (setFileName) {
                                setFileName(file.name);
                            }
                            if (setSize) {
                                const newImg = new window.Image();
                                newImg.src = e.target.result;
                                newImg.onload = function () {
                                    setSize({ width: this.width, height: this.height });
                                }
                            }
                            if (setData) {
                                if (isFormik) {
                                    setData(file, e.target.result);
                                } else {
                                    setData(e.target.result);
                                }
                            }
                            if (getFileSize) {
                                getFileSize(file?.size);
                            }
                        };
                        reader.readAsDataURL(file);
                    } else {
                        if (onError && typeof onError === 'function') {
                            onError();
                        }
                    }
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            for (var i = 0; i < ev.dataTransfer.files.length; i++) {
                if (ev.dataTransfer.files[i].type.includes('image/')) {
                    let reader = new FileReader();
                    reader.onload = async (e) => {
                        setPhoto(e.target.result);
                        setLoadingImage(true);
                        if (setFileName) {
                            setFileName(ev.dataTransfer.files[i].name);
                        }
                        if (setSize) {
                            const newImg = new window.Image();
                            newImg.src = e.target.result;
                            newImg.onload = function () {
                                setSize({ width: this.width, height: this.height });
                            }
                        }
                        if (setData) {
                            if (isFormik) {
                                setData(ev.dataTransfer.files[i], e.target.result);
                            } else {
                                setData(e.target.result);
                            }
                        }
                        if (getFileSize) {
                            getFileSize(ev.dataTransfer.files[i]?.size);
                        }
                    };
                    reader.readAsDataURL(ev.dataTransfer.files[i]);
                } else {
                    if (onError && typeof onError === 'function') {
                        onError();
                    }
                }
            }
        }
    }

    const dragOverHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }

    const dragLeaveHandler = (ev) => {
        setDragging(false);
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }

    const dragEnterHandler = (ev) => {
        setDragging(true);
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    }

    return <Grid {...containerProps} onClick={() => {
        if (clickWhole && upLoadRef?.current) {
            upLoadRef.current.click();
        }
    }}>
        <GridDragAndDrop
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragEnter={dragEnterHandler}
            item
            xs={12}
            display='flex'
            alignItems='center'
            justifyContent='center'
            className={clsx({ 'onDragging': dragging })}
        >
        </GridDragAndDrop>
        {
            photo?.length > 0 &&
            <div style={{
                borderRadius: '50%',
                overflow: 'hidden',
                width: 200,
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }} {...stylesImage}>
                <div style={{
                    display: loadingImage ? 'none' : 'flex',
                    overflow: 'hidden',
                    position: 'relative',
                }} {...stylesImage2}>
                    {
                        showDelete && <IconButton
                            sx={{
                                position: 'absolute',
                                top: 0, right: 0,
                                zIndex: 10,
                                opacity: 0.5,
                                '&:hover': {
                                    opacity: 1,
                                }
                            }}
                            onClick={() => {
                                setLoadingImage(false);
                                setPhoto('');
                            }}
                            aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    }
                    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                        {
                            NextImage && React.isValidElement(<NextImage />) ? <NextImage
                                src={photo}
                                alt='Photo'
                                layout='fill'
                                quality={100}
                                objectFit='cover'
                                onLoadingComplete={() => setLoadingImage(false)}
                                priority={true}
                            /> : <img
                                src={photo}
                                alt='Photo'
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                onLoad={() => setLoadingImage(false)}
                            />
                        }
                    </div>
                </div>
            </div>
        }
        <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
            <Input onChange={handleChange} ref={upLoadRef} accept="image/*" id="icon-button-file" type="file" />
            <IconButton
                sx={{
                    '&:hover': {
                        backgroundColor: 'transparent'
                    },
                    '&.onDragging': {
                        backgroundColor: '#eeeeee',
                        filter: 'brightness(0.5)'
                    },
                    position: 'relative',
                    maxWidth: '70%',
                    maxHeight: '70%',
                }}
                disableFocusRipple={true} disableRipple={true}
                color="primary" aria-label="upload picture" component="span"
            >
                {
                    !photo?.length > 0 && showIconUpload && (
                        CustomIcon
                            ? <CustomIcon />
                            : <UploadFileIcon
                                style={{
                                    width: 100, height: 100, backgroundColor: '#bdbdbd',
                                    borderRadius: '50%', padding: 10, color: 'white',
                                }}
                            />
                    )
                }
            </IconButton>
        </Grid>
        {!photo && showIconUpload && <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='caption' sx={{ px: 2 }} align='center'>
                {helperText || 'Select a photo from the gallery or drag and drop it here.'}
            </Typography>
        </Grid>}
    </Grid>
}

export default UploadComponent;
