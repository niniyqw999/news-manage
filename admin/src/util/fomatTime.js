import moment from "moment"
moment.locale('zh-cn')
const formaTime={
    getTime:(date)=>{

        return moment().format('YYYY/MM/DD')
    }
}

export default formaTime