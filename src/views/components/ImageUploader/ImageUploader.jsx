import React, {useState, useRef, useEffect, memo} from 'react';
import {Card, Paper, Input, FormControl, FormLabel, Button, Box} from "@material-ui/core";
import {AddAPhoto, CloseOutlined, HelpOutline} from "@material-ui/icons";
import "./style.scss"

function ImageUploader({imgSrc ,setData}) {
    let inputRef = useRef()
    let [imageType, setImageType] = useState("fileReader") // or url
    let [src, setSrc] = useState(imgSrc);
    let [isOpen, setIsOpen] = useState(false);

    function imgTypeHandler(){
        switch(imageType){
            case "fileReader" : 
                const reader = new FileReader();
                let file = inputRef.current.files[0];
                reader.onload = (e) =>{
                    setSrc(reader.result);
                }
                // setData(reader.readAsDataURL(blob));
                file && reader.readAsDataURL(file);
                break;
            case "url" : 
                const urlPattern = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/igm;
                console.log(inputRef.current.value.match(urlPattern))
                urlPattern.test(inputRef.current.value) === true &&  setSrc(inputRef.current.value)
        }
    }

    useEffect(()=>{
        setData(data => {return {...data, imgSrc : src}})
    }, [src])

    useEffect(()=>{
        console.log(imgSrc);
        window.sessionStorage.setItem("THUMBNAIL", JSON.stringify(imgSrc));
        // return ()=>{
        //     window.sessionStorage.setItem("THUMBNAIL", JSON.stringify(null));
        // }
    }, [imgSrc])

    return (
        <FormControl className="textEditor_header--picture-form">
            <Button onClick={()=>{setSrc(null); setIsOpen(bool => bool === true ? false : true)}}>{isOpen ? <CloseOutlined/> : (imgSrc ? "replace image" : "Add image")}</Button> 
            {isOpen &&
            <>
                <div className='textEditor_header--uploader-buttons'>
                    <Button onClick={()=>setImageType('fileReader')}>from device</Button><Button onClick={()=>setImageType('url')}>from Url<span style={{marginLeft : 5}} title='use this method is preferable'><HelpOutline/></span></Button>
                </div>
                <div className='textEditor_header--uploader-body'>
                    
                    {imageType === "fileReader" ?
                        <FormLabel htmlFor="textEditor_header--picture-input">
                            <input  onInput={imgTypeHandler} ref={inputRef} id="textEditor_header--picture-input" type="file" accept=".jpg, .png, .svg" className="textEditor_header--picture-input" placeholder="thumbnail image (max 2mb)"/>
                            <Button color="primary" onClick={()=>{
                                setIsOpen(false);
                            }}><AddAPhoto/></Button>
                        </FormLabel> :
                        <FormLabel htmlFor="textEditor_header--picture-input">
                            <input onChange={imgTypeHandler} ref={inputRef} id="textEditor_header--picture-input" type="text" className="textEditor_header--picture-input" placeholder="thumbnail image url"/>
                            <Button color="primary" onClick={()=>{
                                // setTimeout(()=>{
                                    setIsOpen(false);
                                // }, 100)

                            }}><AddAPhoto/></Button>
                        </FormLabel>
                    } 
                </div>
            </>
            }
        </FormControl>
    );
}

export default memo(ImageUploader);