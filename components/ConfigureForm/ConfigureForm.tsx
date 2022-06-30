import React, { useRef } from "react"

import Card from "../UI/Card";

import classes from './ConfigureForm.module.css'

interface FormProps {
    getFormData: (file: File, wordsMinPercent: number, objectsMinPercent: number, useThumbs: boolean) => void
}

const ConfigureForm: React.FC<FormProps> = ({ getFormData }) => {
    const jsonFileRef = useRef<HTMLInputElement>(null);
    const objectsMinRef = useRef<HTMLInputElement>(null);
    const wordsMinRef = useRef<HTMLInputElement>(null);
    const useThumbsRef = useRef<HTMLSelectElement>(null);

    const formSubminHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const jsonFile = jsonFileRef.current!.files![0];
        const useThumbs = Boolean(parseInt(useThumbsRef.current!.value));
        const objectsMin = parseInt(objectsMinRef.current!.value) / 100;
        const wordsMin = parseInt(wordsMinRef.current!.value) / 100;

        getFormData(jsonFile, wordsMin, objectsMin, useThumbs);
    }

    return <Card>
        <form onSubmit={formSubminHandler}>
            <div className={classes.form}>
                <div>
                    <label htmlFor="file">Data:</label>
                    <input id="file" type='file' accept=".json" required ref={jsonFileRef}></input>
                </div>
                <div>
                    <label htmlFor="min-objects">Objects equality min %:</label>
                    <input id="min-objects" type='number' min={0} max={100} defaultValue={50} ref={objectsMinRef}></input>
                </div>
                <div>
                    <label htmlFor="min-words">Words equality min %:</label>
                    <input id="min-words" type='number' min={0} max={100} defaultValue={50} ref={wordsMinRef}></input>
                </div>
                
                <div>
                    <label htmlFor="thumbnail">Use grouping on thumbnail:</label>
                    <select id="thumbnail" ref={useThumbsRef} defaultValue={0}>
                        <option value={0}>false</option>
                        <option value={1}>true</option>
                    </select>  
                </div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </Card>
        
}

export default ConfigureForm;