import React, { useEffect, useState } from 'react'
import NavBarPrincipal from "@/components/NavBarPrincipal/NavBarPrincipal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    getStats()
  }, [])

  function getStats() {
    setIsOpen(JSON.parse(window.localStorage.getItem("kitchenStatus")) ?? false)
  }
  return (
    <>
      <NavBarPrincipal status={isOpen}>

        {
          isOpen &&

          <div className='font-weight-bold mt-5 py-5' style={{ fontSize: 40, color: "white", fontWeight: "bold", textAlign: "center" }}>
            ESTAMOS ABERTOS!! FAÇA SEU PEDIDO!
          </div>
        }


        {!isOpen &&
          <div className='font-weight-bold mt-5 py-5' style={{ fontSize: 40, color: "white", fontWeight: "bold", textAlign: "center" }}>
            ESTAMOS FECHADOS NO MOMENTO!
          </div>
        }

      </NavBarPrincipal>
    </>
  )
}
