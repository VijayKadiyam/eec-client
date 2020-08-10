export function pump_categories() {
  return pc;
}

export function getFlowRate(power, category, hp, headsize) {
  let lpd = 0
  let cat = pc.find(cat => cat.name == category)
  if(cat) {
    let hpower = cat.hps.find(p =>  p.name == hp)
    if(hpower) {
      let size = hpower.sizes.find(size => size.name == headsize)
      lpd = size.lpd
    }
  }
  let idealFlowRate = lpd / (6 * 60);
  console.log('fr:' + hp)

  // 1hp = 750 W
  if(hp == '1D' || hp == '1A')
    hp = 1
  let idealPower = hp * 750;
  return (power * idealFlowRate) / idealPower;
}

let pc = [
  {
    name: 'Surface',
    hps: [
      { name: 0.25, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 0.5, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 0.75, sizes: [{'name': 10, 'lpd': 30000},  {'name': 20, 'lpd': 20000},  {'name': 30, 'lpd': 9000}, ]},
      { name: '1A', sizes: [{'name': 10, 'lpd': 99000 }, ]},
      { name: 2, sizes: [{'name': 10, 'lpd': 198000}, ]},
      { name: 3, sizes: [{'name': 10, 'lpd': 297000},  {'name': 20, 'lpd': 148500}, ]},
      { name: 5, sizes: [{'name': 10, 'lpd': 528000},  {'name': 20, 'lpd': 264000},  {'name': 30, 'lpd': 182400}, ]},
      { name: 7.5, sizes: [{'name': 10, 'lpd': 742500},  {'name': 20, 'lpd': 371250},  {'name': 30, 'lpd': 256500}, ]},
      { name: 10, sizes: [{'name': 10, 'lpd': 990000},  {'name': 20, 'lpd': 495000},  {'name': 30, 'lpd': 342000}, ]},
      { name: 12.5, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 15, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 20, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 25, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
    ],
  },
  {
    name: 'Submersible',
    hps: [
      { name: 0.25, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 0.5, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 0.75, sizes: [{'name': 10, 'lpd': 30000},  {'name': 20, 'lpd': 20000},  {'name': 30, 'lpd': 9000}, ]},
      { name: '1A', sizes: [{'name': 30, 'lpd': 45600}, ]},
      { name: '1D', sizes: [{'name': 30, 'lpd': 20000}, {'name': 60, 'lpd': 10000}, {'name': 90, 'lpd': 5000},]},
      { name: 2, sizes: [{'name': 30, 'lpd': 68400}, ]},
      { name: 3, sizes: [{'name': 30, 'lpd': 114000},  {'name': 50, 'lpd': 69000},  {'name': 70, 'lpd': 45000}, ]},
      { name: 5, sizes: [{'name': 50, 'lpd': 110400},  {'name': 70, 'lpd': 72000},  {'name': 100, 'lpd': 50400}, ]},
      { name: 7.5, sizes: [{'name': 50, 'lpd': 155250},  {'name': 70, 'lpd': 101250},  {'name': 100, 'lpd': 70875}, ]},
      { name: 10, sizes: [{'name': 50, 'lpd': 207000},  {'name': 70, 'lpd': 135000},  {'name': 100, 'lpd': 94500}, ]},
      { name: 12.5, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 15, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 20, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
      { name: 25, sizes: [{'name': 10, 'lpd': 0},  {'name': 20, 'lpd': 0},  {'name': 30, 'lpd': 0}, ]},
    ],
  }
];