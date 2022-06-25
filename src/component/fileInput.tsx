/* eslint-disable no-console */
import { useRef } from 'react';

export default function Sample({ type, setState, children }: any) {
  const inputRef: any = useRef();
  const myReader = (e: any) => {
    const readJson = () => {
      const reader: any = new FileReader(); // File reader to read the file
      reader.addEventListener('load', () => {
        const result = JSON.parse(reader.result);
        try {
          setState(result);
        } catch (err) {
          console.error(err);
        }
      });
      reader.readAsText(e.target.files[0]); // Read the uploaded file
    };
    const readImage = () => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        try {
          setState(reader.result);
        } catch (err) {
          console.error(err);
        }
      });
      reader.readAsDataURL(e.target.files[0]); // Read the uploaded file
    };
    if (e.target.files.length > 0) {
      if (type === 'json') {
        readJson();
      } else {
        readImage();
      }
    }
  };
  return (
    <>
      <input
        type="file"
        onChange={myReader}
        accept={type === 'image' ? 'image/*' : '.json'}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      <div onClick={() => inputRef.current.click()}>{children}</div>
    </>
  );
}
