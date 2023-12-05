import { Link } from "react-router-dom"

import { useSpring, animated } from "@react-spring/web"

function ResultAnimator() {
  const springs = useSpring({
    from: { y: -100 },
    to: { y: 0},
    config: { tension:120, friction:14 }
  })
  return springs
}

export default function Start(){
    return(
        <animated.div style={{...ResultAnimator()}}>
        <div className = "justify-between flex-col flex items-center mt-52">
            <h1 className = "text-8xl font-bold mb-5">Research Recommender</h1>
            <button className = "duration-300 bg-white text-purple-500 to-pink-500 px-6 py-3 font-bold rounded-md hover:scale-110 transition ease-in-out text-3xl">
                <Link to = "/results" >Start!</Link>
            </button>
        </div>
        </animated.div>   
    )
}