const PieKey = (props: any) => {
    const datas = [
        { label: "Pass", value: props.data.pass, color: "#34b233" },
        { label: "Fail", value: props.data.fail, color: "#D70040" },
      ];

      const data2 = datas.sort((a,b) => a.value - b.value);
      const data = data2.reverse()

    return(
        <div>
        {data.map((item)=>{
            return(
                <div className="boxbox">
                    <div className="keyBox" style={{backgroundColor:item.color}}>

                    </div>
                    <text style={{color:"white"}}>{item.label}: {item.value}</text>
                </div>

            )
        })
        }
        </div>
    )

}

export default PieKey;