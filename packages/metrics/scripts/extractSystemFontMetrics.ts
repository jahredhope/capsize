import fs from 'fs/promises';
import path from 'path';
import { fromFile } from '@capsizecss/unpack';

(async () => {
  const fontDirectory = process.env.FONT_DIRECTORY;

  if (!fontDirectory) {
    throw new Error(
      'FONT_DIRECTORY not found. To run this script you must have a font directory locally containing all of the required system fonts.',
    );
  }

  const arial = await fromFile(`${fontDirectory}/Arial.ttf`);
  const sfPro = await fromFile(`${fontDirectory}/SF-Pro.ttf`);
  const roboto = await fromFile(`${fontDirectory}/Roboto.ttf`);
  const segoeui = await fromFile(`${fontDirectory}/SegoeUI.ttf`);
  const oxygen = await fromFile(`${fontDirectory}/Oxygen.ttf`);
  const helvetica = await fromFile(`${fontDirectory}/Helvetica.ttf`);
  const helveticaNeue = await fromFile(`${fontDirectory}/HelveticaNeue.ttf`);
  const timesNewRoman = await fromFile(`${fontDirectory}/Times New Roman.ttf`);

  const content = JSON.stringify(
    [
      arial,
      { ...sfPro, familyName: '-apple-system', descent: -420 },
      { ...sfPro, familyName: 'BlinkMacSystemFont', descent: -420 },
      roboto,
      segoeui,
      { ...oxygen, capHeight: 1468, xHeight: 1085 },
      helvetica,
      helveticaNeue,
      timesNewRoman,
    ],
    null,
    2,
  );

  await fs.writeFile(
    path.join(__dirname, 'systemFonts.json'),
    `${content}\n`,
    'utf-8',
  );
})();
