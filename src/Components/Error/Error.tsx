import s from './Error.module.css';

export const Error = ()=>{
    return(
        <div className={s.errorWrap}>
            <h1 className={s.errorTitle}>404</h1>
            <hr className={s.errorHr}></hr>
            <p className={s.errorDescription}>Requested page not found</p>
        </div>
    )
}