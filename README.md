# react-dndp

A react component for drag and drop photo files

## Note
This is a React Component firstly designed for private use and has been chosen to be publicly available, so the implementation details can be confusing. And so there won't be regular updates.

## Installing
```
yarn add @tallis/react-dndp
```

## Props & Functions

| PropFunc | Type | Required  | Default | Note | Purpose | 
| :-----:  | :-:  |    :-:    | :-:     | :-:  | :-: |
| React | React | true | null | Needed for the component to operate | |
| NextImage | next/image | false | null | When it is a Next Project | To replace basic <img /> tag for showing uploaded photo | 
| formik | boolean | false | null | | To set the return data for setData prop | 
| clickWhole | boolean | false | null | | If it true, the whole drag and drop area will be clickable | 
| showIconUpload | boolean | false | null |  | Used to toggle displaying placeholder for drag&drop area | 
| showDelete | boolean | false | null | | If true, there will be a delete icon when the photo has been uploaded |
| helperText | string | false | "Select a photo from the gallery or drag and drop it here." | | Helpertext for the area |
| data | base64 string | false | null | | Displayed photo | 
| setData | function(param1, param2) | true | null | Depends on prop "formik", there can be one or two params. If "formik", then setData(file, base64), else setData(base64) | 
| getFileSize | function(fileSize) | false | null | | Used to get the size of photo in Bytes | 
| setFileName | function(fileName) | false | null | | Used to get the name of photo |
| setSize | function(sizes) | false | null | {width, height} | Get the dimensions of photo | 
| onError | function() | false | null | | Callback when there is an error | 
| CustomIcon | React Element | false | null | Must be react component | Be displayed when there is no photo | 
| containerProps | React Props | false | null | Props for <Grid /> - MUI | |
| stylesImage, stylesImage2 | React Props | false | null | Props for NextImage's wrappers (see example below) | 

## Example
```jsx
import Image from 'next/image';

import Uploader from '@tallis/react-dndp';
import Paper from '@mui/material';

import UploadIconIllustration from './UploadIconIllustration';

// other code

<Paper variant='outlined' sx={{
    position: 'relative',
    height: photoSizes?.width * 0.7,
    width: photoSizes?.width * 0.7,
    overflow: 'hidden',
    borderRadius: '10px',
    mt: 1
}}>
    <Uploader
         containerProps={{
             sx: {
                 position: 'absolute',
                 top: 0,
                 zIndex: 2,
                 width: '100%',
                 height: '100%',
                 cursor: 'pointer',
                 display: 'flex',
                 flexDirection: 'row',
                 justifyContent: 'center',
                 alignItems: 'center'
                 },
             container: true
          }}
          stylesImage={{
             style: {
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 width: '100%',
                 height: '100%',
             }
          }}
          stylesImage2={{
             style: {
                 width: '100%',
                 height: '100%',
                 position: 'relative'
             }
          }}
          setData={(data, base64) => {
             photo?.set('illustration', data);
             photo?.set('photo', base64);
             setPhoto(photo);
         }}
         data={Boolean(photo?.get('photo')) ? photo?.get('photo') : null}
         CustomIcon={UploadIconIllustration}
         showIconUpload={Boolean(photo?.get('photo')) ? false : true}
         getFileSize={(data) => setIsOver10MB(data)}
         isFormik
         clickWhole
         NextImage={Image}
         React={React}
         onError={() => dispatch({ type: t.SHOW_SNACKBAR, payload: { message: 'Only image file is allowed', type: 'error' } })}
     />
 </Paper>

// other code
```
