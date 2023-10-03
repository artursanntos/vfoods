import { colaboratorIndicatorType, indicatorType } from "../../types";

interface IndicatorCardInfoProps {
    indicatorInfo: colaboratorIndicatorType;
}

export default function IndicatorCardInfo({ indicatorInfo }: IndicatorCardInfoProps) {



    return (
        <div className="w-[17.25rem] h-[11.625]">
            <p>{indicatorInfo.meta}</p>
        </div>
    )
}