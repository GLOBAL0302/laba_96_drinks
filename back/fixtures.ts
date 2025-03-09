import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import { randomUUID } from 'node:crypto';
import Cocktail from './models/Cocktail';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('cocktails');
  } catch (error) {
    console.log('Collection did not present');
  }
  const [admin, user] = await User.create(
    {
      email: 'admin@gmail.com',
      password: '123',
      confirmPassword: '123',
      displayName: 'Admin',
      avatar: 'fixtures/admin.jpg',
      role: 'admin',
      token: randomUUID(),
    },
    {
      email: 'user@gmail.com',
      password: '123',
      confirmPassword: '123',
      displayName: 'user',
      avatar: 'fixtures/user.png',
      role: 'user',
      token: randomUUID(),
    },
  );

  const [cocktail_1, cocktail_2] = await Cocktail.create(
    {
      user: user,
      title: 'Manhattan',
      recipe:
        'Fill a medium liquid measuring cup or mixing glass with ice. Add bourbon and vermouth and stir until well chilled.Strain into a (preferably frosty) coupe glass. Garnish with cherries and a few dashes of bitters.',
      image: 'fixtures/manhattan.png',
      ingredients: [
        { title: 'Bourbon', amount: '2 oz.' },
        { title: 'sweet vermouth', amount: '1 oz.' },
        { title: '2 maraschino cherry (preferably Luxardo)', amount: '2' },
        { title: 'Ice', amount: '2 cubes' },
      ],
      isPublished: true,
    },
    {
      user: user,
      title: 'Mimosa',
      recipe:
        'Divide juice between 6 champagne flutes (2 ounces each), then top each with champagne. Garnish each with a slice of orange if desired.',
      image: 'fixtures/mimosa.png',
      ingredients: [
        { title: 'freshly squeezed orange juice', amount: '12 oz.' },
        { title: 'bottle chilled dry Champagne,', amount: '1 (750-ml.)' },
        { title: 'Prosecco', amount: '1 half' },
        { title: 'Cava', amount: '1 half' },
        { title: 'Orange', amount: '1 slice' },
      ],
      isPublished: false,
    },
  );
  await db.close();
};

run().catch(console.error);
