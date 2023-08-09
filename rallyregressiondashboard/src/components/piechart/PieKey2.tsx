const PieKey2 = (props: any) => {
    const datas = [
        { label: "Pass", value: props.data.pass, color: "#34b233" },
        { label: "Fail", value: props.data.fail, color: "#D70040" },
        { label: "Fixed", value: props.data.fixed, color: "#836953" },
        {
          label: "Intermittent Failure",
          value: props.data.intermittentFailure,
          color: "#836953",
        },
        { label: "Regression", value: props.data.regressions, color: "#A7C7E7" },
        { label: "Flaky", value: props.data.flaky, color: "#fdfd96" },
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