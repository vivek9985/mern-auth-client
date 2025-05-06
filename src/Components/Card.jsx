import Bag from "../assets/bag.png"

export default function Card({ img }) {

    return (
        <div className="w-[350px] 2xl:w-[420px] h-[450px] 2xl:h-[520px] card bg-no-repeat bg-center bg-contain p-10 flex items-center gap-3 justify-end">
            <div className="w-[300px] 2xl:w-[375px] h-[300px] 2xl:h-[375px] flex items-end justify-center">
                <img className="w-full h-full object-bottom object-contain" src={img} alt="" />
            </div>
            <div className="w-full">
                <h3 className="text-[28px] md:text-[32px] xl:text-[38px] font-semibold xl:leading-[52px]">Calathea plant</h3>
                <p className="text-[18px] font-normal leading-[28px] my-3 xl:my-6">Lorem ipsum dolor sit amet,
                    <br />
                    consectetur adipiscing elit</p>
                <div className="flex items-center justify-between">
                    <h4 className="text-[28px] md:text-[32px] xl:text-[38px] font-semibold xl:leading-[52px]">TK. 650/-</h4>
                    <div className="w-10 h-10 cursor-pointer">
                        <img src={Bag} alt="Bag icon" className="w-full h-full object-contain object-center" />
                    </div>
                </div>
            </div>
        </div>
    )

}