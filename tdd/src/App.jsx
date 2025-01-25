import { useState, useRef } from "react";
import { convert } from "../libs/currency";

export default function App() {
    const inputRef = useRef();
    const [result, setResult] = useState(0);

    return (
        <div>
            <h1 role="title">Fx Calculator</h1>
            <form onSubmit={e => {
                e.preventDefault();
                const value = inputRef.current.value;
                value && setResult(convert(value));
            }}>
                <input type="text" role="input" ref={inputRef} />
                <button type="submit" role="button">Convert</button>
            </form>
            <div role="result">{result}</div>
        </div>
    );
}
