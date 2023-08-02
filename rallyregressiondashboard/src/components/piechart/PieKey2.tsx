const PieKey2 = (props: any) => {
    const datas = [
        { label: "Pass", value: props.data.pass, color: "#1a2033" },
        { label: "Fail", value: props.data.fail, color: "#cfa7d1" },
        { label: "Fixed", value: props.data.fixed, color: "#27564f" },
        {
          label: "Intermittent Failure",
          value: props.data.intermittentFailure,
          color: "#f28d7b",
        },
        { label: "Regression", value: props.data.regressions, color: "#1c5b8e" },
        { label: "Flaky", value: props.data.flaky, color: "#511d46" },
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
                <text style={{color:"white"}}>{item.label}'s {item.value}</text>
                </div>

            )
        })
        }
        </div>
    )

}

export default PieKey2;