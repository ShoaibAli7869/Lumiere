const fs = require('fs');
const path = require('path');

const userImages = [
  "https://images.unsplash.com/photo-1716512064598-4536d086736c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amV3bGxlcnl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8amV3ZWxsZXJ5fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1724762183134-c17cf5f5bed2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1626122509259-ea8e0a136ada?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1685970731571-72ede0cb26ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1625516152414-8f33eef3d660?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxqZXdlbGxlcnl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1671642883395-0ab89c3ac890?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxqZXdlbGxlcnl8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1597006354775-2955b15ec026?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxqZXdlbGxlcnl8ZW58MHx8MHx8fDA%3D"
];

let imgIdx = 0;
const getNextImage = () => {
  const img = userImages[imgIdx];
  imgIdx = (imgIdx + 1) % userImages.length;
  return img;
};

const dir = path.join(__dirname, 'client/src/components/home');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /https:\/\/(?:images|plus)\.unsplash\.com\/[-a-zA-Z0-9_/?=&%]+/g;
  let changed = false;
  
  content = content.replace(regex, (match) => {
    changed = true;
    return getNextImage();
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
