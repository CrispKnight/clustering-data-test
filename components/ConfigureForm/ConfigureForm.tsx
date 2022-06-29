import React from "react"

import Card from "../UI/Card";

import classes from './ConfigureForm.module.css'

const ConfigureForm: React.FC = () => {
    return <Card>
        <form>
            <div className={classes.form}>
                <div>
                    <label htmlFor="file">Data:</label>
                    <input id="file" type='file'></input>
                </div>
                <div>
                    <label htmlFor="min-objects">Objects equality min %:</label>
                    <input id="min-objects" type='number' min={0} max={100}></input>
                </div>
                <div>
                    <label htmlFor="min-words">Words equality min %:</label>
                    <input id="min-words" type='number' min={0} max={100}></input>
                </div>
                
                <div>
                    <label htmlFor="thumbnail">Use grouping on thumbnail:</label>
                    <select id="thumbnail">
                        <option value={0}>false</option>
                        <option value={1}>true</option>
                    </select>  
                </div>
            </div>
        </form>
    </Card>
        
}

export default ConfigureForm;