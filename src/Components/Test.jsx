import SplitText from "./SplitText";
import CircularText from './CircularText';
import { ScrollVelocity } from './ScrollVelocity';

export default function Test() {
    const handleAnimationComplete = () => {
        console.log('All letters have animated!');
    };
    return (
        <div className="text-center">
            <div className="hidden">
                <SplitText
                    text="Hello, Tailwind and React Js!"
                    className="text-6xl font-semibold text-center"
                    delay={150}
                    animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                    animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                    easing="easeOutCubic"
                    threshold={0.2}
                    rootMargin="-50px"
                    onLetterAnimationComplete={handleAnimationComplete}
                />
            </div>
            <div className="mt-20 flex items-center justify-center">
                <CircularText
                    text="PLAY OUR INTRO VIDEO &#x2022; PLAY OUR INTRO VIDEO &#x2022; "
                    onHover="pause"
                    spinDuration={10}
                    className="custom-class"
                />
            </div>
            <ScrollVelocity
                texts={['React Bits', 'Scroll Down']}
                velocity={100}
                className="custom-scroll-text hidden"
            />
        </div>
    )
}