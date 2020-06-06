import axios from 'axios'

export const setLocation = (data) =>{
    return {type:'LOCATION',payload:data} 
}

export const startGetLocation = () =>{
    return (dispatch)=>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success)    
         }

         function success(position){
            let latitude  = position.coords.latitude
            let longitude = position.coords.longitude
            //console.log(latitude,longitude)
            axios.get(`https://weather.cit.api.here.com/weather/1.0/report.json?product=observation&latitude=${latitude}&longitude=${longitude}&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ`)
          .then(response =>{
              const data= response.data.observations.location[0].city
              console.log(data)
              dispatch(setLocation(data))
          })
    }
}
}