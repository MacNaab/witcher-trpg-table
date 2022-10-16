import PDFlib from './finalstep/pdflib';
import Recap from './finalstep/recap';

export default function Sample(props: any) {
  const { myData } = props;

  const tablePhy = Math.floor(0.5 * (myData.etape3.COR + myData.etape3.VOL));
  const secondaire = {
    VIG: myData.etape1.data.vigueur,
    ETOU: tablePhy > 10 ? 10 : tablePhy,
    COU: myData.etape3.VIT * 3,
    SAUT: Math.floor((myData.etape3.VIT * 3) / 5),
    PS: 5 * tablePhy,
    END: 5 * tablePhy,
    ENC: myData.etape3.COR * 10,
    REC: tablePhy,
    SB: tablePhy,
  };

  const inventory: any = {
    armor: [],
    weapon: [],
    item: [],
    other: [],
  };

  function recap7(array1: [any], array2: [any]) {
    array1.forEach((e) => {
      const found = array2.find((f: any) => f.nom === e);
      switch (found.type) {
        case 'Arme':
          inventory.weapon.push(e);
          break;
        case 'Armure':
          inventory.armor.push(e);
          break;
        case 'Item':
          inventory.item.push(e);
          break;
        default:
          inventory.other.push(e);
          break;
      }
    });
  }

  recap7(myData.etape7.static, myData.etape1.data.equipmentStatic);
  recap7(myData.etape7.equip, myData.etape1.data.equipement);

  return (
    <div>
      <Recap myData={myData} secondaire={secondaire} inventory={inventory} />
      <hr style={{ maxWidth: '66%', margin: 'auto' }} />
      <PDFlib myData={myData} secondaire={secondaire} inventory={inventory} />
    </div>
  );
}
