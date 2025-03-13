

async function roll() {
    slg = [];
    sgc = 0;
    tal = parseInt(document.getElementById("input").value);
    out = document.getElementById("output");
    pro = document.getElementById("procent");
    let totalIterations = tal ** 4;
    let temp = 0;
    let updateProgressBar = () => {
        let progress = Math.round((sgc / totalIterations) * 10);
        pro.innerHTML = `[${"■".repeat(progress)}${" ".repeat(10 - progress)}]`;
    };

    for(a = 1; a <= tal; a++)   {
        for(b = 1; b <= tal; b++)   {
            for(c = 1; c <= tal; c++)   {
                for(d = 1; d <= tal; d++)   {
                    sgc++;
                    res = (a + b + c + d) - Math.min(a, b, c, d);
                    slg.push(res);
                    if (sgc % 10000) {
                        temp = (slg.reduce((sum, num) => sum + num, 0) + temp)
                        slg = [];
                    }
                    if (sgc % (totalIterations / 10) == 0) {
                        updateProgressBar();
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }
                }
            }
        }
    }
    out.innerHTML = ((slg.reduce((sum, num) => sum + num, 0) + temp) / sgc).toFixed(2);
}