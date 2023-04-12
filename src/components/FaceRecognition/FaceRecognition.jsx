import s from './FaceRecognition.module.scss'

export const FaceRecognition = ({box, imageUrl}) => {
    const pos={
        top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol
    }
    return (
        <div className={s.imageWrap}>
            <img id='input_image' width='200px' height='auto'
                 src={imageUrl}/>
            <div className={s.bounding_box} style={pos}></div>
        </div>
    )
}