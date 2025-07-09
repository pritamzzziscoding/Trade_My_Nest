import { Footer } from "../components/Footer"
import { TermsAndConditions } from "../components/TermsAndConditions"

export const Hero = () => {
    return <>
        <div className="flex items-center justify-center pt-18 flex-col mt-15">
            <TermsAndConditions /> 
        </div>
        <Footer></Footer>
    </> 

}