'use client';

export default function GreetingComponent() {
    const handleClick = () =>{
        console.log("button click");
    }
    return (
        <div>
            <h1> Hello, TypeScript! </h1>
            <p> This is a greeting from a React component.</p>
            <button onClick={handleClick}>Click here</button>
        </div>
    );
}