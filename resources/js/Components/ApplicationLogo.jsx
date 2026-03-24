export default function ApplicationLogo(props) {
    return (
        <img 
            {...props} 
            src="/images/logo-concept.png" 
            alt="MsgOps Logo" 
            className={`${props.className} object-contain`}
        />
    );
}
