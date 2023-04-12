export const ImageLinkForm =({onInputChange, inputValue, onSubmit})=>{
    return (
        <div>
            <input onChange={onInputChange} type={"text"} value={inputValue}/>
            <button onClick={onSubmit}>find</button>
        </div>
    )
}

