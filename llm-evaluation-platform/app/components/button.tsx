'use client';
import { useState } from "react";

export default function cool(){
    const [count,setCount] = useState(0);
    const add = () => setCount(count+1);
    const minus = () => setCount(count-1);
    return (
        <div>
            <button onClick={add}> add </button>
            <button onClick={minus}> minus</button>
            
        </div>
    );
}