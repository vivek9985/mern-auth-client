import Bag from "../assets/bag.png"
import Plant from "../assets/plant.png"

export default function Card() {

    return (
        <div className="w-[420px] h-[520px] card bg-no-repeat bg-center bg-contain p-10 flex items-center justify-end">
            <div className="w-[375px] h-[375px] flex items-center justify-center">
                <img src={Plant} alt="" />
            </div>
            <div className="w-full">
                <h3 className="text-[38px] font-semibold leading-[52px]">Calathea plant</h3>
                <p className="text-[18px] font-normal leading-[28px] my-6">Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit</p>
                <div className="flex items-center justify-between">
                    <h4 className="text-[38px] font-semibold leading-[52px]">TK. 650/-</h4>
                    <div className="w-10 h-10 cursor-pointer">
                        <img src={Bag} alt="Bag icon" className="w-full h-full object-contain object-center" />
                    </div>
                </div>
            </div>
        </div>
    )

}