import {useState,useEffect,useContext} from "react";
import {ContextApi} from "/src/components/ContextApi";
import { copyText } from "/helpers/toast";
import { RiInformationFill } from "react-icons/ri";
import Info from "/src/components/transaction/inc/Info";
import Modal from "/src/components/Modal";

const Step1 = ({isOpen,setIsOpen,next}) => {

  const [isProceed,setIsProceed] = useState(false)
  const {transactionData,setTransactionData} = useContext(ContextApi);
  const [isInnerOpen,setIsInnerOpen] = useState({info: false});

  
     useEffect(() => {
    //Save current exchange rate to user Context
    setTransactionData({
      ...transactionData,
      withdrawal:{ 
        ...transactionData.withdrawal,
        amount: (transactionData.withdrawal.usdt*transactionData.exchangeRate).toFixed(2)
      }})

    if(transactionData.withdrawal.usdt >= 10) return setIsProceed(true);
    setIsProceed(false);

  },[transactionData.withdrawal.usdt])


   const handleSubmit = (e) => {
      e.preventDefault();
      next();
   }


  return (
    <div>
    <Info 
    title='Withdrawal Fee'
    content='1 USDT fee will be added to the  USDT amount to be sent.'
    isOpen={isInnerOpen.info} 
    setIsOpen={() => setIsInnerOpen({...isInnerOpen,info: !isInnerOpen.info}) } />

    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <header className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h2 className="font-bold">Send USDT  to Receive Naira </h2>
                        </div>
                        <p>Send USDT to receive Naira in any bank account </p>
            </header>

            <form className={`grid md:grid-cols-2 gap-4 text-base text-gray-200`} onSubmit={(e) => handleSubmit(e)}>

                  <div className="form-group md:col-span-2 border-t border-b border-gray-100 py-3">
                    Exchange Rate: <strong>N{ transactionData.exchangeRate }</strong>
                  </div>

                   <div className="form-group md:col-span-2">
                      <label> How much USDT do you want to withdrawal?</label>
                      <input 
                        type="text" 
                        defaultValue={(transactionData.withdrawal.usdt)}
                        onChange={(e) => setTransactionData({
                            ...transactionData,
                            withdrawal : {
                              ...transactionData.withdrawal,
                              usdt : e.target.value
                            }
                          })} 
                        className="form-control text-right py-2 font-bold  bg-gray-50  text-gray-30 border pl-24" />
                      <div className="absolute bottom-9 md:bottom-10 left-3 font-medium  flex justify-center items-center space-x-2 text-gray-30">
                        <img src="/assets/svgs/usdt.svg" /> 
                        <span>USDT</span>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsInnerOpen({...isOpen,info: !isInnerOpen.info}) }
                        className="text-xs text-green-600 flex items-center">
                         <RiInformationFill size={20} /> <span>1 USDT Withdrawal fee will be added</span>
                      </button>
                  </div>

                   <div className="form-group md:col-span-2">
                      <label>Amount Value in Naira</label>
                      <input 
                        value={transactionData.withdrawal.amount}  
                        disbaled
                        type="text" 
                        className="form-control text-right py-2 font-bold  bg-gray-50  text-gray-30 border pl-24 "  />
                      <div 
                        className="absolute top-8 left-3 font-medium  flex justify-center items-center space-x-2 text-gray-30">
                        <img src="/assets/svgs/ng.svg" /> 
                        <span>NGN</span>
                      </div>
                  </div>

                   <div className="form-group md:col-span-2 ">
                      <button 
                        disabled={!isProceed}
                        className={`btn w-full py-5 ${!isProceed ? 'cursor-not-allowed bg-gray-800' : 'bg-blue-900'}`} 
                        type="submit">
                          Continue
                        </button>
                  </div>

                   <div className="form-group md:col-span-2 ">
                      <button 
                        className={`btn w-full py-1 text-blue-900`} 
                        onClick={() => setIsOpen()}
                        type="button"
                        >
                          Cancel
                        </button>
                  </div>
            </form>
      </Modal>
    </div>
  )
}

export default Step1;