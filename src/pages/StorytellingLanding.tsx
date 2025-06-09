
import React, { useEffect } from 'react';

const StorytellingLanding = () => {
  useEffect(() => {
    // Custom CSS
    const customCSS = `
      section{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:80px 24px;}
      .hidden{opacity:0;transform:translateY(60px);transition:all .6s ease;}
      .visible{opacity:1;transform:translateY(0);}
      .card{background:#FFF;border:1px solid #E5E7EB;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,.04);padding:32px;max-width:540px;width:100%;}
      h1,h2{font-weight:700;color:#1E40FF;margin-bottom:12px;text-align:center;}
      .big{font-size:2.6rem;}
      button.cta{background:#1E40FF;color:#FFF;padding:18px 32px;border-radius:12px;font-size:1.1rem;font-weight:600;border:none;cursor:pointer;display:inline-block;margin-top:32px;}
      button.cta:active{transform:scale(.97);}
      input[type=range]{width:100%;}
      .fade{transition:opacity .3s linear;}
      .money{font-weight:700;font-size:1.5rem;color:#1E40FF;}
      small{font-size:.8rem;color:#4B5563;}
      .radio-group{display:flex;flex-direction:column;gap:8px;margin:16px 0;}
      .radio-item{display:flex;align-items:center;gap:8px;}
      input[type=radio]{margin:0;}
      input[type=number]{padding:8px;border:1px solid #E5E7EB;border-radius:4px;width:100px;}
      ul{list-style:none;padding:0;}
      li{margin:12px 0;display:flex;align-items:flex-start;}
      li::before{content:"✓";color:#1E40FF;font-weight:bold;margin-right:8px;}
      hr{border:none;border-top:1px solid #E5E7EB;margin:24px 0;}
    `;

    // Add custom styles
    const styleElement = document.createElement('style');
    styleElement.textContent = customCSS;
    document.head.appendChild(styleElement);

    // Custom JS
    const secs = document.querySelectorAll('section');
    secs.forEach(s => { s.classList.add('hidden'); });
    
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    }), { threshold: .5 });
    
    secs.forEach(s => obs.observe(s));

    // Calculation logic
    const plans = [
      { n: "Early", min: 5, max: 20, t: 0.00034, p: 1700, v: 5 },
      { n: "Growth", min: 21, max: 40, t: 0.00030, p: 6300, v: 21 },
      { n: "Scale", min: 41, max: 60, t: 0.00024, p: 9600, v: 41 },
      { n: "High-Vol", min: 61, max: 100, t: 0.00020, p: 12000, v: 61 },
      { n: "Custom", min: 100, max: 9999, t: 0.00018, p: 18000, v: 100 }
    ];
    
    const descs = { "Flex": 0, "6m": 0.05, "12m": 0.10 };
    const ip_fee = 55, kick_fee = 1200, fx = 6, gainPP = 15;

    function fmt(v: number, brl: boolean) {
      return brl ? `R$ ${(v * fx).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : `$${v.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    function calc() {
      const slider = document.getElementById('slider') as HTMLInputElement;
      const currency = document.querySelector('input[name=currency]:checked') as HTMLInputElement;
      const cpcInput = document.getElementById('cpcInput') as HTMLInputElement;
      const cta = document.getElementById('cta') as HTMLButtonElement;
      
      if (!slider || !currency || !cpcInput || !cta) return;

      const vol = +slider.value;
      const volTxt = document.getElementById('volTxt');
      if (volTxt) volTxt.innerText = `${vol}M`;
      
      const plan = plans.find(p => vol >= p.min && vol <= p.max) || plans[plans.length - 1];
      const planName = document.getElementById('planName');
      if (planName) planName.innerText = plan.n;
      
      const mode = document.querySelector('input[name=mode]:checked') as HTMLInputElement;
      if (!mode) return;
      
      const piso = plan.p * (1 - descs[mode.value as keyof typeof descs]);
      const incl = plan.v * 1e6, emails = vol * 1e6;
      const exced = Math.max(emails - incl, 0), excedCost = exced * plan.t;
      const ips = Math.ceil(emails / 90e6), ipCost = ips * ip_fee;
      const total = piso + excedCost + ipCost;
      const annual = total * 12;
      const brl = currency.value === "BRL";
      
      const tarifa = document.getElementById('tarifa');
      if (tarifa) tarifa.innerText = fmt(plan.t, brl);
      
      const commit = document.getElementById('commit');
      if (commit) commit.innerText = `${fmt(annual, brl)} / ano`;
      
      const extra = emails * gainPP / 100;
      const extraInbox = document.getElementById('extraInbox');
      if (extraInbox) extraInbox.innerText = `+${(extra / 1e6).toFixed(1)}M`;
      
      const cpc = +cpcInput.value;
      const roi = (extra * 0.03 * cpc) / total; // 3% CTR
      
      const rev = document.getElementById('rev');
      if (rev) rev.innerText = fmt(extra * 0.03 * cpc, brl);
      
      const roiEl = document.getElementById('roi');
      if (roiEl) roiEl.innerText = roi.toFixed(1) + "x";
      
      cta.innerText = `Quero este plano agora!`;
    }

    // Add event listeners
    document.addEventListener('input', calc);
    document.addEventListener('change', calc);
    
    // Initial calculation
    setTimeout(calc, 100);

    // Cleanup
    return () => {
      document.head.removeChild(styleElement);
      obs.disconnect();
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#EEF2FF', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <section>
        <h1 className="big">Quantos e-mails você <u>perde</u> na caixa de spam?</h1>
        <p>Descubra agora o custo real de não ter um IP dedicado.</p>
      </section>

      <section>
        <div className="card">
          <h2>1 · Escolha seu volume</h2>
          <input type="range" id="slider" min="5" max="120" step="1" defaultValue="20" />
          <p id="volTxt" className="money"></p>
          <small>milhões de e-mails/mês</small>
          <hr />
          <h2>2 · Prazo de compromisso</h2>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" name="mode" value="12m" id="mode12" defaultChecked />
              <label htmlFor="mode12">Anual –10 %</label>
            </div>
            <div className="radio-item">
              <input type="radio" name="mode" value="6m" id="mode6" />
              <label htmlFor="mode6">Semestral –5 %</label>
            </div>
            <div className="radio-item">
              <input type="radio" name="mode" value="Flex" id="modeFlex" />
              <label htmlFor="modeFlex">Flex</label>
            </div>
          </div>
          <hr />
          <h2>3 · Moeda</h2>
          <div className="radio-group">
            <div className="radio-item">
              <input type="radio" name="currency" value="USD" id="currUSD" defaultChecked />
              <label htmlFor="currUSD">USD</label>
            </div>
            <div className="radio-item">
              <input type="radio" name="currency" value="BRL" id="currBRL" />
              <label htmlFor="currBRL">BRL</label>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="card">
          <h2>Investimento fixo EverInbox</h2>
          <p>Plano <span id="planName"></span></p>
          <p className="money" id="tarifa"></p>
          <p id="commit" style={{ fontWeight: 600 }}></p>
          <p><small>* 1 IP dedicado incluído a cada 90 M</small></p>
        </div>
      </section>

      <section>
        <div className="card">
          <h2>Ganho potencial com IP dedicado</h2>
          <p>E-mails extras na Inbox (@ +15 p.p.)</p>
          <p className="money" id="extraInbox"></p>
          <hr />
          <p>Custo por clique médio (edite): 
            <input type="number" id="cpcInput" defaultValue="0.15" step="0.01" />
          </p>
          <p>Receita extra mensal</p>
          <p className="money" id="rev"></p>
          <hr />
          <p>ROI potencial</p>
          <p className="money" id="roi"></p>
        </div>
      </section>

      <section>
        <div className="card">
          <h2>Sem risco de desperdício</h2>
          <ul>
            <li><b>Crédito automático</b>: disparou menos que o piso? vira crédito válido 9 meses.</li>
            <li><b>Kick-start de Reputação</b>: equipe configura DNS + aquece 50 k envios.</li>
            <li><b>Sem surpresa</b>: cancelou? reembolsamos créditos menos custo do IP.</li>
          </ul>
          <button 
            className="cta" 
            id="cta" 
            onClick={() => window.open('https://everinbox.com.br/contato', '_blank')}
          >
            Quero este plano agora!
          </button>
        </div>
      </section>
    </div>
  );
};

export default StorytellingLanding;
