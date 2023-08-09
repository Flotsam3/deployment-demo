export const registerApi = async (data) => {
   try {
      const response = await fetch("https://banking-app-backend-2n55.onrender.com/api/user/register", {
         method: "POST",
         body: JSON.stringify(data),
         headers:{
            "Content-Type":"application/json"
         }
      });

      if (response.status === 200){
         return console.log("Registrierung erfolgreich!");
      };

      throw new Error("Registrierung fehlgeschlagen!");
   } catch (error) {
      console.log(error);
   }
}

export const loginApi = async (data) => {
   try {
      const response = await fetch("https://banking-app-backend-2n55.onrender.com/api/user/login", {
         method: "POST",
         body: JSON.stringify(data),
         headers:{
            "Content-Type":"application/json"
         },
         credentials: "include"
      });
      const userData = await response.json();
      if (response.status === 200){
         console.log("Anmeldung erfolgreich!");
         return userData;
      }
      throw new Error("Anmeldung fehlgeschlagen!")
   } catch (error) {
      console.log(error);
   }
}

export const chargeOffApi = async (newBalance) => {
   try {
      const response = await fetch("https://banking-app-backend-2n55.onrender.com/api/user/transaction/getMoney", {
         method: "POST",
         body: JSON.stringify({balance:newBalance}),
         headers:{
            "Content-Type":"application/json"
         },
         credentials: "include"
      });
      const data = await response.json();
      if (response.status === 200){
         console.log("Daten abgerufen!");
         return data;
      }
      throw new Error("Fehler beim abrufen der Daten!")
   } catch (error) {
      console.log(error);
   }
}

export const payInApi = async (newBalance) => {
   try {
      const response = await fetch("https://banking-app-backend-2n55.onrender.com/api/user/transaction/postMoney", {
         method: "POST",
         body: JSON.stringify({balance:newBalance}),
         headers:{
            "Content-Type":"application/json"
         },
         credentials: "include"
      });
      const data = await response.json();
      if (response.status === 200){
         console.log("Daten abgerufen!");
         return data;
      }
      throw new Error("Fehler beim abrufen der Daten!");
   } catch (error) {
      console.log(error);
   }
}

export const getUserApi = async() => {
   try {
      const response = await fetch("https://banking-app-backend-2n55.onrender.com/api/user/data",{
         credentials: "include"
      });
      const data = await response.json();
      if (response.status === 200){
         console.log("Daten abgerufen!");
         return {balance:data.balance, transactions: data.transactions};
      }
      throw new Error("Fehler beim abrufen der Daten!")
   } catch (error) {
      console.log(error);
   }
}