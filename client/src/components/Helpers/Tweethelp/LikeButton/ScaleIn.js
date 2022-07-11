import { useSpring, animated, config} from "react-spring";

const ScaleIn = ({children}) => {
    const styles = useSpring({
        opacity: 1,
        transform: "scale(1)",
        from: {
            // opacity: 0,
            transform: "scale(0)"
        },
        // config: config.gentle,
        config: {
            tension: 150,
            friction: 10
        },
        display: "flex",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    });

    return (
        <animated.div style={styles}>
            {children}
        </animated.div>
    );
}

export default ScaleIn;