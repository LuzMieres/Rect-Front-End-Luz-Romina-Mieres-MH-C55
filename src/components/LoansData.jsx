import axios from 'axios';
import { useEffect, useState } from 'react';
import '../styles/style.css';


function LoansData() {
  const [clients, setClients] = useState([]);

  function obtenerClients() {
    axios.get("http://localhost:8080/api/clients/")
      .then(response => {
        const clientData = response.data;
        console.log(clientData);

        setClients(clientData);
      })
      .catch(error => {
        console.error("There was a problem with the request:", error);
      });

  } useEffect(() => {
    obtenerClients();
  }, []);
  function formatAmountToARS(amount) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(amount);
  }
  return (
    <>
      <div className="flex flex-wrap gap-5 m-5 justify-center">
        {clients.map(client => (
          <div key={client.id} className="flex justify-around flex-col w-full gap-5">
            {client.loans.map(loan => (
              <table className='border w-[700px] h-[100px] text-center text-3xl'>
                <tr className='border'>
                  {Object.keys(loan).filter(key => key !== 'loanid' && key !== 'id').map(key => (
                    <th className='border w-[200px]' key={key}>{key.toUpperCase()}</th>
                  ))}
                </tr>
                <tr>
                  {Object.keys(loan).filter(key => key !== 'loanid' && key !== 'id').map(key => (
                    <td className='border' key={key}>
                      {key === 'amount' ? formatAmountToARS(loan[key]) : loan[key]}
                    </td>
                  ))}
                </tr>
              </table>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
export default LoansData