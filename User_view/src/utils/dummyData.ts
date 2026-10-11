import { Product, Category } from "@/types/product";
import { Car } from "@/types/car";

export const dummyCars: Car[] = [
  {
    "id": 1,
    "brand": "Maruti",
    "model": "Swift",
    "year": 2022,
    "variant": "VXi / ZXi"
  },
  {
    "id": 2,
    "brand": "Maruti",
    "model": "Baleno",
    "year": 2023,
    "variant": "Delta / Zeta"
  },
  {
    "id": 3,
    "brand": "Maruti",
    "model": "Brezza",
    "year": 2023,
    "variant": "ZXi"
  },
  {
    "id": 4,
    "brand": "Hyundai",
    "model": "i20",
    "year": 2021,
    "variant": "Sportz / Asta"
  },
  {
    "id": 5,
    "brand": "Hyundai",
    "model": "Creta",
    "year": 2023,
    "variant": "SX / SX(O)"
  },
  {
    "id": 6,
    "brand": "Hyundai",
    "model": "Verna",
    "year": 2022,
    "variant": "SX"
  },
  {
    "id": 7,
    "brand": "Tata",
    "model": "Nexon",
    "year": 2022,
    "variant": "XZ+ / Fearless"
  },
  {
    "id": 8,
    "brand": "Tata",
    "model": "Altroz",
    "year": 2021,
    "variant": "XZ / XZ+"
  },
  {
    "id": 9,
    "brand": "Tata",
    "model": "Punch",
    "year": 2023,
    "variant": "Creative"
  },
  {
    "id": 10,
    "brand": "Mahindra",
    "model": "Scorpio",
    "year": 2020,
    "variant": "S11"
  },
  {
    "id": 11,
    "brand": "Mahindra",
    "model": "Thar",
    "year": 2022,
    "variant": "LX"
  },
  {
    "id": 12,
    "brand": "Mahindra",
    "model": "XUV700",
    "year": 2023,
    "variant": "AX7"
  },
  {
    "id": 13,
    "brand": "Toyota",
    "model": "Innova",
    "year": 2021,
    "variant": "Crysta"
  },
  {
    "id": 14,
    "brand": "Toyota",
    "model": "Fortuner",
    "year": 2022,
    "variant": "4x4 AT"
  },
  {
    "id": 15,
    "brand": "Honda",
    "model": "City",
    "year": 2021,
    "variant": "1.5L i-VTEC"
  },
  {
    "id": 16,
    "brand": "Honda",
    "model": "Amaze",
    "year": 2022,
    "variant": "1.2L Petrol"
  },
  {
    "id": 17,
    "brand": "Kia",
    "model": "Seltos",
    "year": 2022,
    "variant": "HTX / GTX"
  },
  {
    "id": 18,
    "brand": "Kia",
    "model": "Sonet",
    "year": 2023,
    "variant": "HTX"
  }
];

export const dummyCategories: Category[] = [
  {
    "id": 1,
    "name": "Brakes & Rotors",
    "description": "Brake pads, discs, calipers and fluid"
  },
  {
    "id": 2,
    "name": "Engine Components",
    "description": "Spark plugs, pistons, timing belts and gaskets"
  },
  {
    "id": 3,
    "name": "Filters & Fluids",
    "description": "Air, oil, cabin filters and engine lubricants"
  },
  {
    "id": 4,
    "name": "Suspension & Steering",
    "description": "Shock absorbers, struts, tie rods and ball joints"
  },
  {
    "id": 5,
    "name": "Electricals & Lights",
    "description": "Headlights, tail lamps, fuses, alternators and sensors"
  },
  {
    "id": 6,
    "name": "Batteries & Power",
    "description": "High-cranking maintenance-free automotive batteries"
  }
];

export const dummyProducts: Product[] = [
  {
    "id": 1,
    "name": "Bosch Front Ceramic Brake Pad Set",
    "description": "Premium low-metallic ceramic brake pads engineered for superior stopping power, zero noise, and extended rotor life. Tested under rigorous OEM specifications.",
    "price": 2499,
    "stock": 18,
    "partNumber": "BP-BSH-9921",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 101,
    "sellerName": "Sharma Auto Spares (Delhi NCR)",
    "sellerLocation": "Delhi NCR",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ],
    "availableColors": [
      "Silver",
      "Black"
    ]
  },
  {
    "id": 2,
    "name": "Brembo Max Slotted Front Brake Rotors (Pair)",
    "description": "High-carbon ventilated slotted disc rotors ensuring rapid heat dissipation, reduced brake fade, and instantaneous pedal bite under extreme braking.",
    "price": 5890,
    "stock": 12,
    "partNumber": "BR-BRM-8830",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 102,
    "sellerName": "Apex Brakes & Suspension Hub (Mumbai)",
    "sellerLocation": "Mumbai",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ],
    "availableColors": [
      "Metallic Grey",
      "Dark Chrome"
    ]
  },
  {
    "id": 3,
    "name": "TVS Girling Brake Master Cylinder Assembly",
    "description": "OEM-certified hydraulic brake master cylinder with dual-circuit pressure chamber for fail-safe hydraulic fluid displacement and precise braking feel.",
    "price": 3450,
    "stock": 9,
    "partNumber": "MC-TVS-4011",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 103,
    "sellerName": "Gupta Brothers Motor Works (Jaipur)",
    "sellerLocation": "Jaipur",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ],
    "availableColors": [
      "Silver",
      "Zinc Coated"
    ]
  },
  {
    "id": 4,
    "name": "Ferodo Premier Rear Brake Shoe Set",
    "description": "Thermostabilized bonded rear drum brake shoes designed to deliver smooth deceleration, minimal drum wear, and extended service intervals.",
    "price": 1399,
    "stock": 24,
    "partNumber": "BS-FRD-2201",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 104,
    "sellerName": "Brembo Official Distribution (Bengaluru)",
    "sellerLocation": "Bengaluru",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ],
    "availableColors": [
      "Dark Grey"
    ]
  },
  {
    "id": 5,
    "name": "Bosch DOT 4 High-Performance Brake Fluid (1L)",
    "description": "High dry boiling point fluid (260°C) with moisture-resistant glycol ethers, preventing vapor lock and protecting ABS valve bodies from internal corrosion.",
    "price": 499,
    "stock": 85,
    "partNumber": "BF-BSH-DT4",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 105,
    "sellerName": "Kolkata Spare Depot (Kolkata)",
    "sellerLocation": "Kolkata",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      }
    ]
  },
  {
    "id": 6,
    "name": "Brembo 4-Piston Performance Brake Caliper Kit",
    "description": "Monobloc forged aluminum 4-piston calipers in signature gloss red finish. Drastically cuts braking distance and provides track-grade modulation.",
    "price": 14890,
    "stock": 5,
    "partNumber": "CP-BRM-4PST",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 106,
    "sellerName": "Punjab Tractors & Car Spares (Ludhiana)",
    "sellerLocation": "Ludhiana",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ],
    "availableColors": [
      "Gloss Red",
      "Racing Yellow",
      "Matte Black"
    ]
  },
  {
    "id": 7,
    "name": "Bosch ABS Wheel Speed Sensor Front",
    "description": "Magnetic Hall-effect wheel speed sensor delivering millisecond wheel rotation data to the ECU to prevent wheel lockup on wet and icy asphalt.",
    "price": 1250,
    "stock": 30,
    "partNumber": "SS-BSH-ABS1",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 107,
    "sellerName": "Deccan Auto Parts Traders (Hyderabad)",
    "sellerLocation": "Hyderabad",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ]
  },
  {
    "id": 8,
    "name": "Aisin Brake Booster Vacuum Pump",
    "description": "Precision diaphragm vacuum booster unit restoring lightweight, responsive brake pedal action in diesel and turbo petrol vehicles.",
    "price": 4750,
    "stock": 8,
    "partNumber": "BB-ASN-771",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 108,
    "sellerName": "Poona Motor Components (Pune)",
    "sellerLocation": "Pune",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      }
    ]
  },
  {
    "id": 9,
    "name": "Brembo Carbon Ceramic Rear Brake Pads",
    "description": "Zero-dust carbon ceramic composite rear friction pads designed for clean alloy wheels and silent city and highway cruising.",
    "price": 2899,
    "stock": 19,
    "partNumber": "BP-BRM-CC89",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 109,
    "sellerName": "Madras Auto Distributing Co. (Chennai)",
    "sellerLocation": "Chennai",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ],
    "availableColors": [
      "Black",
      "Copper Brown"
    ]
  },
  {
    "id": 10,
    "name": "EBC Brakes Ultimax OEM Replacement Discs (Pair)",
    "description": "Precision-balanced cast iron rotors offering uniform heat dispersion and surface trueness to eradicate steering flutter during highway braking.",
    "price": 6499,
    "stock": 7,
    "partNumber": "RT-EBC-UMX",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 110,
    "sellerName": "Ahmedabad Spares Junction (Ahmedabad)",
    "sellerLocation": "Ahmedabad",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      }
    ]
  },
  {
    "id": 11,
    "name": "Bosch Heavy-Duty Handbrake Cable Assembly",
    "description": "High-tensile braided steel handbrake emergency cable with Teflon inner lining to resist stretching and water intrusion.",
    "price": 890,
    "stock": 40,
    "partNumber": "HB-BSH-882",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 111,
    "sellerName": "Surat Speedline Traders (Surat)",
    "sellerLocation": "Surat",
    "sellerRating": 4.6,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      }
    ]
  },
  {
    "id": 12,
    "name": "Rane Madras Front Brake Disc Rotor Kit",
    "description": "OEM factory-grade ventilated disc pair manufactured with anti-corrosion geomet coating for long-lasting rust protection.",
    "price": 3850,
    "stock": 15,
    "partNumber": "RT-RNM-441",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 112,
    "sellerName": "Avadh Genuine Spares (Lucknow)",
    "sellerLocation": "Lucknow",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 13,
    "name": "Motul DOT 5.1 Synthetic Racing Brake Fluid (500ml)",
    "description": "100% synthetic extreme-pressure brake fluid with 270°C boiling point formulated for ABS and ESP systems requiring low viscosity.",
    "price": 650,
    "stock": 60,
    "partNumber": "BF-MTL-510",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 113,
    "sellerName": "Malwa Motor Spares (Indore)",
    "sellerLocation": "Indore",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 14,
    "name": "Delphi Front Caliper Pin Guide & Bushing Kit",
    "description": "Case-hardened stainless caliper slider pins with heat-resistant silicone boots to prevent sticky brakes and uneven pad taper wear.",
    "price": 699,
    "stock": 52,
    "partNumber": "CP-DLP-901",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 114,
    "sellerName": "Chandigarh Wheels & Parts (Chandigarh)",
    "sellerLocation": "Chandigarh",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ]
  },
  {
    "id": 15,
    "name": "Brembo Heavy-Duty Rear Brake Drum Set",
    "description": "Solid iron-cast rear brake drum housing balanced to strict European standards, guaranteeing smooth parking brake bite and long lifespan.",
    "price": 3299,
    "stock": 11,
    "partNumber": "BD-BRM-991",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 115,
    "sellerName": "Coimbatore Auto Hub (Coimbatore)",
    "sellerLocation": "Coimbatore",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ]
  },
  {
    "id": 16,
    "name": "Bosch Brake Fluid Reservoir with Level Sensor",
    "description": "Transparent high-density polyethylene fluid tank complete with integrated electrical low-level reed sensor switch.",
    "price": 1150,
    "stock": 16,
    "partNumber": "RS-BSH-202",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 116,
    "sellerName": "Malabar Auto Spares (Kochi)",
    "sellerLocation": "Kochi",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ]
  },
  {
    "id": 17,
    "name": "Ferodo High-Friction Track Day Brake Pads",
    "description": "Aggressive semi-metallic compound providing instantaneous cold bite and consistent friction coefficient up to 600°C.",
    "price": 4299,
    "stock": 6,
    "partNumber": "BP-FRD-TRK",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 1,
    "categoryName": "Brakes & Rotors",
    "sellerId": 117,
    "sellerName": "Orange City Spares (Nagpur)",
    "sellerLocation": "Nagpur",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      }
    ],
    "availableColors": [
      "Racing Red",
      "Gold"
    ]
  },
  {
    "id": 18,
    "name": "NGK Laser Iridium Spark Plug (Set of 4)",
    "description": "Ultra-fine laser-welded iridium center electrode provides superior ignitability, faster throttle response, anti-fouling performance, and better fuel economy.",
    "price": 1850,
    "stock": 35,
    "partNumber": "SP-NGK-IR4",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 118,
    "sellerName": "Magadh Auto Spares (Patna)",
    "sellerLocation": "Patna",
    "sellerRating": 4.6,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ],
    "availableColors": [
      "Silver Nickel"
    ]
  },
  {
    "id": 19,
    "name": "Gates PowerGrip Timing Belt & Tensioner Kit",
    "description": "Heavy-duty HNBR timing belt reinforced with fiberglass tensile cords, accompanied by OEM hydraulic tensioner pulley and idlers.",
    "price": 4490,
    "stock": 14,
    "partNumber": "TB-GTS-PGK",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 119,
    "sellerName": "Lakecity Car Spares (Bhopal)",
    "sellerLocation": "Bhopal",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ]
  },
  {
    "id": 20,
    "name": "Denso Direct Ignition Coil Pack (Set of 4)",
    "description": "High-voltage magnetic induction coils delivering clean 35,000V energy to eliminate engine misfires, erratic idle, and sluggish acceleration.",
    "price": 5299,
    "stock": 10,
    "partNumber": "IC-DNS-4PC",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 120,
    "sellerName": "Kashi Motor Corporation (Varanasi)",
    "sellerLocation": "Varanasi",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ],
    "availableColors": [
      "Black Matte"
    ]
  },
  {
    "id": 21,
    "name": "Mahle Engine Intake & Exhaust Valve Set (16 Pcs)",
    "description": "Stellite-tipped bi-metallic engine valves with chrome-plated stems resisting thermal fatigue and combustion chamber pressure.",
    "price": 3890,
    "stock": 8,
    "partNumber": "EV-MHL-16V",
    "imageUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 121,
    "sellerName": "Bosch Authorized Express (Gurugram)",
    "sellerLocation": "Gurugram",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 22,
    "name": "Valeo Dual-Mass Flywheel & Clutch Plate Kit",
    "description": "Premium clutch assembly including organic friction disc, diaphragm pressure plate, and dual-mass flywheel to isolate engine torsional vibrations.",
    "price": 12499,
    "stock": 6,
    "partNumber": "CK-VAL-DMF",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 122,
    "sellerName": "Mann-Filter India Direct (Noida)",
    "sellerLocation": "Noida",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      }
    ]
  },
  {
    "id": 23,
    "name": "Bosch Common Rail CRDi Diesel Injector",
    "description": "High-precision piezoelectric diesel fuel injector supporting 2000-bar rail pressures for whisper-quiet idle and low emissions.",
    "price": 8490,
    "stock": 11,
    "partNumber": "FI-BSH-CRD",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 123,
    "sellerName": "NGK Ignition Pro Dealer (Faridabad)",
    "sellerLocation": "Faridabad",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      }
    ]
  },
  {
    "id": 24,
    "name": "BorgWarner Turbocharger Core Cartridge (CHRA)",
    "description": "Dynamically balanced turbocharger center cartridge featuring ceramic ball bearings and inconel turbine wheel for instant boost spool-up.",
    "price": 16999,
    "stock": 4,
    "partNumber": "TC-BGW-CHR",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 124,
    "sellerName": "Continental Drive Spares (Ghaziabad)",
    "sellerLocation": "Ghaziabad",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      }
    ]
  },
  {
    "id": 25,
    "name": "Victor Reinz Multi-Layer Steel (MLS) Cylinder Head Gasket",
    "description": "Triple-layer stainless steel embossed gasket ensuring leak-proof sealing between cylinder block and head under severe boost.",
    "price": 2190,
    "stock": 22,
    "partNumber": "HG-VRZ-MLS",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 125,
    "sellerName": "Valeo Genuine Store (Kalyan)",
    "sellerLocation": "Kalyan",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 26,
    "name": "Continental Multi-V Serpentine Alternator Belt",
    "description": "EPDM synthetic rubber ribbed drive belt resistant to ozone, temperature extremes, and slippage under high alternator electrical loads.",
    "price": 780,
    "stock": 45,
    "partNumber": "SB-CNT-6PK",
    "imageUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 126,
    "sellerName": "Denso Authorized Distributor (Thane)",
    "sellerLocation": "Thane",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 27,
    "name": "Aisin High-Flow Engine Water Pump",
    "description": "Die-cast aluminum coolant pump with anti-cavitation impeller and ceramic mechanical seal to prevent coolant seepage.",
    "price": 2690,
    "stock": 18,
    "partNumber": "WP-ASN-HF1",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 127,
    "sellerName": "Mobil Lubricants Central (Navi Mumbai)",
    "sellerLocation": "Navi Mumbai",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ]
  },
  {
    "id": 28,
    "name": "Behr Mahle Engine Thermostat Assembly (82°C)",
    "description": "Wax element thermostat with integrated housing and temperature sensor ensuring rapid engine warm-up and ideal operating efficiency.",
    "price": 1450,
    "stock": 28,
    "partNumber": "TH-MHL-82C",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 128,
    "sellerName": "Castrol PitStop Hub (Vadodara)",
    "sellerLocation": "Vadodara",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ]
  },
  {
    "id": 29,
    "name": "Bosch Camshaft Position Sensor",
    "description": "OEM hall-sensor providing real-time cylinder synchronization signal to the engine management computer for flawless fuel injection timing.",
    "price": 1190,
    "stock": 32,
    "partNumber": "CS-BSH-CPS",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 129,
    "sellerName": "Shell Auto Fluids Depot (Rajkot)",
    "sellerLocation": "Rajkot",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 30,
    "name": "Denso Mass Air Flow (MAF) Sensor Unit",
    "description": "Hot-wire airflow meter measuring intake air volume with extreme precision, correcting lean/rich fuel trim conditions.",
    "price": 3650,
    "stock": 12,
    "partNumber": "MF-DNS-MAF",
    "imageUrl": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 130,
    "sellerName": "TVS Girling Spares Center (Madurai)",
    "sellerLocation": "Madurai",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ]
  },
  {
    "id": 31,
    "name": "Federal-Mogul Engine Piston Ring Set STD",
    "description": "Plasma-moly coated compression rings and nitrided oil scraper rings engineered to restore factory cylinder compression and eliminate oil burning.",
    "price": 2950,
    "stock": 9,
    "partNumber": "PR-FDM-STD",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 131,
    "sellerName": "Rane Madras Spares Link (Tiruchirappalli)",
    "sellerLocation": "Tiruchirappalli",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 32,
    "name": "Febi Bilstein Hydraulic Engine Mount Front Right",
    "description": "Fluid-filled hydraulic dampening engine mount absorbing four-cylinder idle shudder and torque transfer jerk during acceleration.",
    "price": 3299,
    "stock": 15,
    "partNumber": "EM-FBB-HYD",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 132,
    "sellerName": "Gabriel Shock Absorber Store (Nashik)",
    "sellerLocation": "Nashik",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ]
  },
  {
    "id": 33,
    "name": "K&N High-Flow Performance Oil Filter",
    "description": "Heavy-duty canister oil filter with synthetic micro-glass filtration media and welded 1-inch nut on end for easy removal.",
    "price": 1199,
    "stock": 40,
    "partNumber": "OF-KNN-HP1",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 133,
    "sellerName": "Monroe Suspension Point (Aurangabad)",
    "sellerLocation": "Aurangabad",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 34,
    "name": "NGK Oxygen O2 Lambda Sensor (Upstream)",
    "description": "Zirconia planar lambda sensor monitoring exhaust air-fuel ratio to maintain stoichiometric 14.7:1 combustion and maximize mileage.",
    "price": 2490,
    "stock": 26,
    "partNumber": "OX-NGK-UP1",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 2,
    "categoryName": "Engine Components",
    "sellerId": 134,
    "sellerName": "SKF Precision Bearings (Jamshedpur)",
    "sellerLocation": "Jamshedpur",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 35,
    "name": "Mann Carbon Activated Cabin Air Filter",
    "description": "High-efficiency particulate cabin filter that eliminates 99% of airborne allergens, fine dust, exhaust fumes, and harmful pollutants inside your vehicle cabin.",
    "price": 899,
    "stock": 45,
    "partNumber": "AF-MNN-334",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 135,
    "sellerName": "Exide Power Mart (Ranchi)",
    "sellerLocation": "Ranchi",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ],
    "availableColors": [
      "Charcoal Grey"
    ]
  },
  {
    "id": 36,
    "name": "Mobil 1 ESP 5W-30 Advanced Full Synthetic Engine Oil (4L)",
    "description": "Industry-leading full synthetic motor oil formulated with anti-wear additive package for prolonged engine life, low volatility, and sludge resistance.",
    "price": 3899,
    "stock": 50,
    "partNumber": "OL-MBL-5W30",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 136,
    "sellerName": "Amaron PitStop Battery Hub (Dehradun)",
    "sellerLocation": "Dehradun",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 37,
    "name": "Castrol EDGE Titanium 0W-20 Fully Synthetic Oil (3.5L)",
    "description": "Engineered with Fluid Titanium technology to withstand tremendous pressures inside modern downsized turbocharged petrol engines.",
    "price": 3250,
    "stock": 38,
    "partNumber": "OL-CST-0W20",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 137,
    "sellerName": "Philips Auto Lighting Zone (Agra)",
    "sellerLocation": "Agra",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ]
  },
  {
    "id": 38,
    "name": "Bosch High Performance Engine Air Filter",
    "description": "Micro-pleated polyurethane framed air filter offering 98% dust filtration efficiency while providing unrestricted airflow to the intake manifold.",
    "price": 499,
    "stock": 65,
    "partNumber": "AF-BSH-HP1",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 138,
    "sellerName": "Osram Lumens Direct (Meerut)",
    "sellerLocation": "Meerut",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ]
  },
  {
    "id": 39,
    "name": "Motul 300V Factory Line 10W-40 Synthetic Oil (2L)",
    "description": "Ester Core racing synthetic lubricant providing maximum horsepower output and unmatched shear stability under brutal heat loads.",
    "price": 2890,
    "stock": 16,
    "partNumber": "OL-MTL-300V",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 139,
    "sellerName": "Hella Horns & Bulbs World (Amritsar)",
    "sellerLocation": "Amritsar",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 40,
    "name": "Mahle Original Spin-On Engine Oil Filter",
    "description": "Heavy-duty steel canister with silicone anti-drainback valve ensuring immediate oil pressure at cold start-up and protecting engine bearings.",
    "price": 380,
    "stock": 90,
    "partNumber": "OF-MHL-OC9",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 140,
    "sellerName": "Bilstein Pro Performance (Jalandhar)",
    "sellerLocation": "Jalandhar",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 9,
        "brand": "Tata",
        "model": "Punch",
        "year": 2023,
        "variant": "Creative"
      }
    ]
  },
  {
    "id": 41,
    "name": "Shell Helix Ultra 5W-40 PurePlus Synthetic Oil (4L)",
    "description": "Made from natural gas using PurePlus technology, creating a base oil that is 99.5% pure, preventing engine power loss over 10,000 km.",
    "price": 3499,
    "stock": 40,
    "partNumber": "OL-SHL-5W40",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 141,
    "sellerName": "TRW Chassis Parts Depot (Udaipur)",
    "sellerLocation": "Udaipur",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      }
    ]
  },
  {
    "id": 42,
    "name": "Valeo High-Efficiency Diesel Fuel Filter Cartridge",
    "description": "Multi-stage water separation diesel filter removing microscopic particulates down to 3 microns to safeguard sensitive common-rail high-pressure fuel pumps.",
    "price": 1150,
    "stock": 35,
    "partNumber": "FF-VAL-DSL",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 142,
    "sellerName": "Lemförder Steering Hub (Kota)",
    "sellerLocation": "Kota",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      }
    ]
  },
  {
    "id": 43,
    "name": "Toyota Genuine Super Long Life Coolant Red (5L)",
    "description": "Pre-mixed 50/50 ethylene glycol pink coolant specifically formulated for aluminum engine blocks with anti-rust non-silicate additives.",
    "price": 1890,
    "stock": 25,
    "partNumber": "CL-TYT-SLL",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 143,
    "sellerName": "BorgWarner Turbo Depot (Kanpur)",
    "sellerLocation": "Kanpur",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 44,
    "name": "Castrol Transmax ATF Automatic Transmission Fluid (1L)",
    "description": "Smooth-drive technology ATF delivering superior clutch friction performance and thermal resistance for CVT, Torque Converter, and DCT gearboxes.",
    "price": 740,
    "stock": 45,
    "partNumber": "TF-CST-ATF",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 144,
    "sellerName": "Ferodo Friction Center (Gwalior)",
    "sellerLocation": "Gwalior",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ]
  },
  {
    "id": 45,
    "name": "Mann Hummel Oil Filter Insert with O-Ring Kit",
    "description": "Eco-friendly metal-free filter cartridge made of embossed cellulose fibers with synthetic bonding for high dirt-holding capacity.",
    "price": 490,
    "stock": 70,
    "partNumber": "OF-MNN-HU7",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 145,
    "sellerName": "EBC Brakes Superstore (Jabalpur)",
    "sellerLocation": "Jabalpur",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 46,
    "name": "Motul Motylgear 75W-90 Synthetic Manual Gear Oil (1L)",
    "description": "Extreme pressure synthetic gearbox lubricant reinforced with molybdenum disulfide for slick, notch-free manual gear shifting in cold weather.",
    "price": 890,
    "stock": 30,
    "partNumber": "GO-MTL-759",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 146,
    "sellerName": "Aisin Clutch & Pump Hub (Mysuru)",
    "sellerLocation": "Mysuru",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ]
  },
  {
    "id": 47,
    "name": "Bosch Dual-Action HEPA Cabin Air Purifier Filter",
    "description": "Medical-grade HEPA media combined with coconut shell activated carbon to trap PM2.5 particulates, bacteria, and toxic traffic fumes.",
    "price": 1199,
    "stock": 28,
    "partNumber": "AF-BSH-HEP",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 147,
    "sellerName": "Gates Belts & Hose Store (Mangaluru)",
    "sellerLocation": "Mangaluru",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ]
  },
  {
    "id": 48,
    "name": "Liqui Moly Cera Tec Ceramic Engine Protection Additive (300ml)",
    "description": "Micro-ceramic solid lubricant suspension that bonds to engine cylinder walls, drastically reducing friction, noise, and engine operating temperature.",
    "price": 2450,
    "stock": 22,
    "partNumber": "AD-LQM-CRT",
    "imageUrl": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 148,
    "sellerName": "Liqui Moly Care Point (Hubballi)",
    "sellerLocation": "Hubballi",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 49,
    "name": "Castrol Radicool Premixed Anti-Freeze Coolant (3L)",
    "description": "All-season coolant protecting cooling systems against freezing down to -18°C and boiling up to 108°C without scaling radiator core fins.",
    "price": 699,
    "stock": 55,
    "partNumber": "CL-CST-RDC",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 149,
    "sellerName": "Motul Racing Oils Dealer (Vijayawada)",
    "sellerLocation": "Vijayawada",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ]
  },
  {
    "id": 50,
    "name": "Purolator Engine Air Filter Element",
    "description": "Rigid multi-layer treated paper filter providing optimal flow rates while keeping abrasive dust grains out of your engine cylinders.",
    "price": 360,
    "stock": 60,
    "partNumber": "AF-PRL-551",
    "imageUrl": "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 150,
    "sellerName": "Purolator Filters Store (Visakhapatnam)",
    "sellerLocation": "Visakhapatnam",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ]
  },
  {
    "id": 51,
    "name": "Liqui Moly Engine Flush Plus Cleaner (300ml)",
    "description": "Gentle solvent flush formula dissolved into old oil prior to change, dissolving black sludge deposits from oil galleys and piston rings.",
    "price": 590,
    "stock": 75,
    "partNumber": "AD-LQM-EFP",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 3,
    "categoryName": "Filters & Fluids",
    "sellerId": 151,
    "sellerName": "Victor Reinz Gasket House (Warangal)",
    "sellerLocation": "Warangal",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 52,
    "name": "Monroe Front Gas-Charged Strut & Shock Absorber",
    "description": "Heavy-duty nitrogen gas-pressurized shock absorbers engineered to improve vehicle handling, reduce body roll, and absorb severe road vibrations comfortably.",
    "price": 4999,
    "stock": 12,
    "partNumber": "SA-MNR-5542",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 152,
    "sellerName": "Federal-Mogul Piston Depot (Salem)",
    "sellerLocation": "Salem",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ],
    "availableColors": [
      "Gloss Black",
      "Metallic Grey"
    ]
  },
  {
    "id": 53,
    "name": "Gabriel Heavy-Duty Rear Gas Shock Absorbers (Pair)",
    "description": "Duo-tube nitrogen charged rear dampers designed for Indian road conditions with multi-lip piston seal and bonded rubber eyelet bushings.",
    "price": 3890,
    "stock": 16,
    "partNumber": "SA-GBR-RR2",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 153,
    "sellerName": "Febi Bilstein Mounts Direct (Tiruppur)",
    "sellerLocation": "Tiruppur",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      }
    ],
    "availableColors": [
      "Black"
    ]
  },
  {
    "id": 54,
    "name": "TRW Front Lower Control Arm with Ball Joint (Left)",
    "description": "High-strength forged steel wishbone control arm fitted with OEM pre-greased ball joint and high-durability natural rubber bushings.",
    "price": 2799,
    "stock": 14,
    "partNumber": "CA-TRW-LFT",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 154,
    "sellerName": "Mahle Engine Store (Aligarh)",
    "sellerLocation": "Aligarh",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ]
  },
  {
    "id": 55,
    "name": "TRW Front Lower Control Arm with Ball Joint (Right)",
    "description": "Right-hand front suspension arm maintaining precise wheel caster and camber geometry during high-speed highway cornering.",
    "price": 2799,
    "stock": 14,
    "partNumber": "CA-TRW-RGT",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 155,
    "sellerName": "Microtek Auto Electronics (Moradabad)",
    "sellerLocation": "Moradabad",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ]
  },
  {
    "id": 56,
    "name": "Lemförder Outer Steering Tie Rod End Pair",
    "description": "Precision ball-socket steering link connecting the steering rack to steering knuckles for laser-accurate steering wheel tracking.",
    "price": 1850,
    "stock": 25,
    "partNumber": "TR-LMF-OT2",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 156,
    "sellerName": "NOCO Smart Power Mart (Bareilly)",
    "sellerLocation": "Bareilly",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 57,
    "name": "Moog Front Stabilizer Sway Bar Anti-Roll Link Kit",
    "description": "Hardened steel sway bar connecting rods reducing lateral body sway and stabilizing vehicle chassis during emergency lane change maneuvers.",
    "price": 1290,
    "stock": 30,
    "partNumber": "SB-MOG-LNK",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 157,
    "sellerName": "SpeedMaster Auto Spares (Gorakhpur)",
    "sellerLocation": "Gorakhpur",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 9,
        "brand": "Tata",
        "model": "Punch",
        "year": 2023,
        "variant": "Creative"
      }
    ]
  },
  {
    "id": 58,
    "name": "SKF Front Wheel Hub Bearing Assembly with ABS Ring",
    "description": "Pre-lubricated dual-row angular contact sealed wheel bearing unit guaranteeing zero rolling hum, frictionless rotation, and long hub life.",
    "price": 3450,
    "stock": 15,
    "partNumber": "HB-SKF-FWB",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 158,
    "sellerName": "Bharat Auto Components (Saharanpur)",
    "sellerLocation": "Saharanpur",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ]
  },
  {
    "id": 59,
    "name": "Bilstein B4 OE Replacement Front Strut",
    "description": "German-engineered gas-pressure strut maintaining constant damping performance even under continuous heavy rural road punishment.",
    "price": 7490,
    "stock": 8,
    "partNumber": "ST-BLS-B4F",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 159,
    "sellerName": "Royal Rajputana Spares (Bikaner)",
    "sellerLocation": "Bikaner",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ],
    "availableColors": [
      "Bilstein Black"
    ]
  },
  {
    "id": 60,
    "name": "Rane Madras Hydraulic Power Steering Rack & Pinion",
    "description": "Complete steering gear assembly with pre-fitted inner tie rods and rubber bellows, tested for zero hydraulic fluid leakage at 120 bar.",
    "price": 9999,
    "stock": 5,
    "partNumber": "SR-RNM-HPS",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 160,
    "sellerName": "Marwar Motor Spares (Jodhpur)",
    "sellerLocation": "Jodhpur",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 61,
    "name": "Febi Bilstein Front Strut Top Mount with Roller Bearing",
    "description": "Reinforced rubber-metal top mount with internal thrust ball bearing ensuring smooth steering rotation and noise-free suspension travel.",
    "price": 1490,
    "stock": 22,
    "partNumber": "SM-FBB-TOP",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 161,
    "sellerName": "Haryana Car Spares Hub (Rohtak)",
    "sellerLocation": "Rohtak",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 62,
    "name": "Monroe Heavy-Duty Front Coil Spring Set",
    "description": "Cold-wound chrome silicon steel coil springs restoring factory ride height, ground clearance, and bump absorption capability.",
    "price": 3150,
    "stock": 10,
    "partNumber": "CS-MNR-FCS",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 162,
    "sellerName": "Karnal Auto Spares Agency (Karnal)",
    "sellerLocation": "Karnal",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      }
    ]
  },
  {
    "id": 63,
    "name": "Gabriel Gas-Matic Rear Shock Absorber Pair",
    "description": "Micro-cellular urethane jounce bumper shock absorbers offering plush cabin ride quality over road potholes and speed breakers.",
    "price": 3599,
    "stock": 18,
    "partNumber": "SA-GBR-GMR",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 163,
    "sellerName": "Panipat Auto Link (Panipat)",
    "sellerLocation": "Panipat",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      },
      {
        "id": 9,
        "brand": "Tata",
        "model": "Punch",
        "year": 2023,
        "variant": "Creative"
      }
    ]
  },
  {
    "id": 64,
    "name": "Lemförder Inner Steering Rack Axle Joint Track Rod",
    "description": "High-grade case-hardened ball pin connecting rack gear to tie rod, restoring crisp steering feel and stopping front-end clunking.",
    "price": 1190,
    "stock": 26,
    "partNumber": "TR-LMF-INR",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 164,
    "sellerName": "Doon Valley Car Spares (Haridwar)",
    "sellerLocation": "Haridwar",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 65,
    "name": "TRW Front Subframe Rubber Bushing Set (4 Pcs)",
    "description": "Elastomeric rubber dampening bushes isolating front engine cradle vibration from the passenger passenger compartment cabin floor.",
    "price": 1650,
    "stock": 20,
    "partNumber": "BS-TRW-SFB",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 165,
    "sellerName": "Kumaon Motor Spares (Haldwani)",
    "sellerLocation": "Haldwani",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      }
    ]
  },
  {
    "id": 66,
    "name": "SKF Rear Wheel Hub Bearing Unit with Integrated ABS Sensor",
    "description": "Maintenance-free rear wheel hub unit sealed for life with high-temperature polyurea grease to survive monsoon water wading.",
    "price": 2890,
    "stock": 19,
    "partNumber": "HB-SKF-RWB",
    "imageUrl": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 166,
    "sellerName": "Shimla Hill Spares (Shimla)",
    "sellerLocation": "Shimla",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ]
  },
  {
    "id": 67,
    "name": "Moog Rear Trailing Arm Suspension Bushing Kit",
    "description": "Heavy-duty poly-rubber trailing arm bushings eliminating rear axle wander and uneven tire shoulder edge wear on expressways.",
    "price": 1390,
    "stock": 24,
    "partNumber": "BS-MOG-TAB",
    "imageUrl": "https://images.unsplash.com/photo-1600790142055-619df03207e6?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 167,
    "sellerName": "Jammu Auto Spares Corp. (Jammu)",
    "sellerLocation": "Jammu",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 68,
    "name": "Bilstein Heavy-Duty Rear Monotube Shock Absorber",
    "description": "Single-tube design high-pressure gas damper resisting aeration and fluid foaming during full payload passenger and luggage touring.",
    "price": 6890,
    "stock": 7,
    "partNumber": "SA-BLS-RMT",
    "imageUrl": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80",
    "categoryId": 4,
    "categoryName": "Suspension & Steering",
    "sellerId": 168,
    "sellerName": "Golden Temple Auto Parts (Amritsar)",
    "sellerLocation": "Amritsar",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 69,
    "name": "Philips H4 DiamondVision 5000K Headlight Bulbs",
    "description": "Ultimate white light 5000K halogen headlamp bulbs delivering high-contrast beam clarity for night driving safety without blinding oncoming traffic.",
    "price": 1450,
    "stock": 30,
    "partNumber": "HL-PHL-H4",
    "imageUrl": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 169,
    "sellerName": "Patiala Motor Store (Patiala)",
    "sellerLocation": "Patiala",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ],
    "availableColors": [
      "5000K Crisp White"
    ]
  },
  {
    "id": 70,
    "name": "Osram Night Breaker 200 H7 Performance Bulbs (Pair)",
    "description": "Produces up to 200% more light and 150m longer beam distance than standard bulbs, providing maximum reaction time on unlit rural highways.",
    "price": 2190,
    "stock": 22,
    "partNumber": "HL-OSR-NB2",
    "imageUrl": "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 170,
    "sellerName": "Bathinda Auto Traders (Bathinda)",
    "sellerLocation": "Bathinda",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ],
    "availableColors": [
      "Ultra Bright Yellow-White"
    ]
  },
  {
    "id": 71,
    "name": "Bosch 12V 90A High-Output Alternator Assembly",
    "description": "OEM replacement high-efficiency alternator with built-in electronic voltage regulator to power aftermarket amplifiers and light bars cleanly.",
    "price": 7999,
    "stock": 7,
    "partNumber": "AL-BSH-90A",
    "imageUrl": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 171,
    "sellerName": "Srinagar Auto Spares Depot (Srinagar)",
    "sellerLocation": "Srinagar",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 72,
    "name": "Denso Heavy-Duty 12V Gear-Reduction Starter Motor",
    "description": "Compact high-torque electric starter motor designed for instantaneous cold weather engine cranking with low battery amperage draw.",
    "price": 5490,
    "stock": 9,
    "partNumber": "SM-DNS-12V",
    "imageUrl": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 172,
    "sellerName": "Goa Coastal Car Parts (Panaji)",
    "sellerLocation": "Panaji",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 16,
        "brand": "Honda",
        "model": "Amaze",
        "year": 2022,
        "variant": "1.2L Petrol"
      }
    ]
  },
  {
    "id": 73,
    "name": "Hella Chrome Trumpet Twin Horn Set (110dB)",
    "description": "Iconic high-pitch harmonic dual-tone acoustic automotive horns engineered with Teflon moisture filter and chrome grill styling.",
    "price": 1399,
    "stock": 45,
    "partNumber": "HN-HLA-TPC",
    "imageUrl": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 173,
    "sellerName": "Belagavi Auto Spares (Belagavi)",
    "sellerLocation": "Belagavi",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ],
    "availableColors": [
      "Chrome",
      "Black"
    ]
  },
  {
    "id": 74,
    "name": "Philips Ultinon Pro9000 LED Headlight Kit H4",
    "description": "Top-tier Lumileds automotive LED chips providing razor-sharp cutoff lines, 5800K daylight color temp, and up to 5,000 hours operating life.",
    "price": 6890,
    "stock": 12,
    "partNumber": "LD-PHL-900",
    "imageUrl": "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 174,
    "sellerName": "Bhubaneswar Auto Links (Bhubaneswar)",
    "sellerLocation": "Bhubaneswar",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      }
    ],
    "availableColors": [
      "5800K Cool White"
    ]
  },
  {
    "id": 75,
    "name": "Valeo Clear Lens Projector Fog Lamp Assembly (Pair)",
    "description": "Sealed polycarbonate lens front fog light units with cast aluminum heat sink body and precision cut-off internal projector shield.",
    "price": 3499,
    "stock": 16,
    "partNumber": "FL-VAL-PRJ",
    "imageUrl": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 175,
    "sellerName": "Cuttack Motor Parts (Cuttack)",
    "sellerLocation": "Cuttack",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 76,
    "name": "Bosch Main Engine ECU Relay & Micro-Fuse Kit",
    "description": "Essential electrical restoration box containing 10x 30A automotive micro-relays and 30x assorted blade fuses with gold-plated terminals.",
    "price": 850,
    "stock": 60,
    "partNumber": "RL-BSH-FUS",
    "imageUrl": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 176,
    "sellerName": "Raipur Auto Components (Raipur)",
    "sellerLocation": "Raipur",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ]
  },
  {
    "id": 77,
    "name": "Osram LEDriving Dynamic Mirror Indicator Turn Signals",
    "description": "Sleek flowing sequential amber LED side mirror indicator units with tinted smoked lens housing and plug-and-play wiring connectors.",
    "price": 4590,
    "stock": 14,
    "partNumber": "LD-OSR-DYN",
    "imageUrl": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 177,
    "sellerName": "Bhilai Steel City Spares (Bhilai)",
    "sellerLocation": "Bhilai",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ],
    "availableColors": [
      "Smoked Amber"
    ]
  },
  {
    "id": 78,
    "name": "Hella Midnight Black Twin Tone Disc Horn Set",
    "description": "Matte black corrosion-resistant disc horns with penetrating sound propagation for highway safety and city traffic alertness.",
    "price": 990,
    "stock": 50,
    "partNumber": "HN-HLA-MDB",
    "imageUrl": "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 178,
    "sellerName": "Guwahati North-East Spares (Guwahati)",
    "sellerLocation": "Guwahati",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ],
    "availableColors": [
      "Matte Black",
      "Red Trim"
    ]
  },
  {
    "id": 79,
    "name": "Philips CrystalVision Platinum H11 Fog Lamp Bulbs",
    "description": "Quartz glass H11 bulbs with blue cap coating delivering a sharp 4300K white beam through thick fog, heavy rain, and dust storms.",
    "price": 1650,
    "stock": 26,
    "partNumber": "HL-PHL-H11",
    "imageUrl": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 179,
    "sellerName": "Shillong Mountain Spares (Shillong)",
    "sellerLocation": "Shillong",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ]
  },
  {
    "id": 80,
    "name": "Denso Ultrasonic Reverse Parking Sensor Kit (4 Sensors)",
    "description": "Flush-mount 4-sensor bumper radar system with audio chime beeper and digital LED distance display measuring obstacles from 0.3m to 2.5m.",
    "price": 2390,
    "stock": 18,
    "partNumber": "PS-DNS-4SN",
    "imageUrl": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 180,
    "sellerName": "Agartala Motor Depot (Agartala)",
    "sellerLocation": "Agartala",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ],
    "availableColors": [
      "Pearl White",
      "Metallic Silver",
      "Glossy Black"
    ]
  },
  {
    "id": 81,
    "name": "Valeo Windshield Wiper Motor & Linkage Assembly",
    "description": "High-torque 2-speed electric wiper drive motor paired with heavy duty zinc-plated pantograph linkage arms for clear windshield sweep.",
    "price": 3890,
    "stock": 11,
    "partNumber": "WM-VAL-LNK",
    "imageUrl": "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 181,
    "sellerName": "Siliguri Junction Spares (Siliguri)",
    "sellerLocation": "Siliguri",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      }
    ]
  },
  {
    "id": 82,
    "name": "Bosch Duraterm Fast Glow Plug Set (Diesel 4 Pcs)",
    "description": "Patented double-coil heating element glow plugs reaching 1000°C in under 3 seconds for instant diesel cold ignition and reduced smoke.",
    "price": 2690,
    "stock": 20,
    "partNumber": "GP-BSH-DT4",
    "imageUrl": "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 182,
    "sellerName": "Asansol Industrial Spares (Asansol)",
    "sellerLocation": "Asansol",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      }
    ]
  },
  {
    "id": 83,
    "name": "Osram Cool Blue Intense W5W LED Parking Bulbs (Pair)",
    "description": "Modern 6000K icy white wedge LED bulbs for parking lights, number plate illumination, and glove box lighting with no error codes.",
    "price": 650,
    "stock": 70,
    "partNumber": "LD-OSR-W5W",
    "imageUrl": "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 183,
    "sellerName": "Dhanbad Coalfield Spares (Dhanbad)",
    "sellerLocation": "Dhanbad",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 84,
    "name": "Hella Rallye 3003 High-Beam Auxiliary Driving Light",
    "description": "Clear glass halogen auxiliary spotlight with impact-resistant housing and high-boost reflector for off-road expedition illumination.",
    "price": 4999,
    "stock": 8,
    "partNumber": "HL-HLA-R30",
    "imageUrl": "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=600&auto=format&fit=crop&q=80",
    "categoryId": 5,
    "categoryName": "Electricals & Lights",
    "sellerId": 184,
    "sellerName": "Gaya Heritage Auto Parts (Gaya)",
    "sellerLocation": "Gaya",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 85,
    "name": "Exide Matrix 45Ah Maintenance-Free Car Battery",
    "description": "High-cranking power sealed automotive battery featuring advanced alloy grids, vibration resistance, and long-life performance in Indian tropical weather.",
    "price": 5299,
    "stock": 14,
    "partNumber": "BT-EXD-MT45",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 185,
    "sellerName": "Muzaffarpur Car Hub (Muzaffarpur)",
    "sellerLocation": "Muzaffarpur",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      }
    ],
    "availableColors": [
      "Red / Black"
    ]
  },
  {
    "id": 86,
    "name": "Amaron Flo 55Ah High Cranking Automotive Battery",
    "description": "Patented Silven-X alloy battery providing extraordinary cranking amps, zero maintenance electrolyte retention, and 55-month warranty coverage.",
    "price": 6450,
    "stock": 16,
    "partNumber": "BT-AMR-FL55",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 186,
    "sellerName": "Prayagraj Sangam Spares (Prayagraj)",
    "sellerLocation": "Prayagraj",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ],
    "availableColors": [
      "Signature Green"
    ]
  },
  {
    "id": 87,
    "name": "Bosch S4 65Ah Silver Alloy DIN Battery",
    "description": "German silver technology battery designed for vehicles with high electrical equipment demands, power seats, and start-stop tech.",
    "price": 7890,
    "stock": 10,
    "partNumber": "BT-BSH-S465",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 187,
    "sellerName": "Jhansi Bundelkhand Spares (Jhansi)",
    "sellerLocation": "Jhansi",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      }
    ],
    "availableColors": [
      "Black / Silver"
    ]
  },
  {
    "id": 88,
    "name": "Exide Mileage 35Ah Compact Hatchback Battery",
    "description": "Reliable, budget-friendly 35Ah starter battery engineered for small-displacement Indian city hatchbacks with high start-stop cycles.",
    "price": 3999,
    "stock": 25,
    "partNumber": "BT-EXD-ML35",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 188,
    "sellerName": "Mathura Krishna Auto Mart (Mathura)",
    "sellerLocation": "Mathura",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      },
      {
        "id": 9,
        "brand": "Tata",
        "model": "Punch",
        "year": 2023,
        "variant": "Creative"
      }
    ],
    "availableColors": [
      "Red / Grey"
    ]
  },
  {
    "id": 89,
    "name": "Amaron Pro 65Ah Heavy-Duty Diesel SUV Battery",
    "description": "Built to deliver immense cold cranking current for large 2.0L+ diesel turbo engines, resisting under-hood engine temperatures up to 80°C.",
    "price": 8250,
    "stock": 9,
    "partNumber": "BT-AMR-PR65",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 189,
    "sellerName": "Ujjain Mahakal Car Spares (Ujjain)",
    "sellerLocation": "Ujjain",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ],
    "availableColors": [
      "Signature Green / Black"
    ]
  },
  {
    "id": 90,
    "name": "Bosch C7 12V/24V Intelligent Microprocessor Charger",
    "description": "Automated 7A battery trickle charger with pulse regeneration mode to revive deeply discharged lead-acid, AGM, and GEL batteries.",
    "price": 6290,
    "stock": 12,
    "partNumber": "CH-BSH-C70",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 190,
    "sellerName": "Ratlam Express Spares (Ratlam)",
    "sellerLocation": "Ratlam",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 91,
    "name": "NOCO Boost Plus GB40 1000A Lithium Jump Starter",
    "description": "UltraSafe 1000-amp lithium jump starter box with spark-proof technology and reverse polarity protection, good for up to 20 jump starts per charge.",
    "price": 9890,
    "stock": 8,
    "partNumber": "JS-NCO-GB40",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 191,
    "sellerName": "Ajmer Sharif Auto Spares (Ajmer)",
    "sellerLocation": "Ajmer",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 92,
    "name": "Amaron Current 80Ah Commercial Diesel Battery",
    "description": "Maximum capacity commercial grade lead-acid storage battery for commercial transport and heavy passenger carriers.",
    "price": 9499,
    "stock": 6,
    "partNumber": "BT-AMR-CR80",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 192,
    "sellerName": "Bhilwara Textile Auto Hub (Bhilwara)",
    "sellerLocation": "Bhilwara",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 93,
    "name": "Exide Epiq 74Ah Extended Warranty Automotive Battery",
    "description": "Flagship 74Ah automotive battery featuring special cast radial grid design and highest corrosion resistance with a 6-year warranty.",
    "price": 9190,
    "stock": 8,
    "partNumber": "BT-EXD-EP74",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 193,
    "sellerName": "Alwar National Spares (Alwar)",
    "sellerLocation": "Alwar",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 94,
    "name": "Bosch Pure Lead-Acid 60Ah DIN Battery",
    "description": "Designed to exact European DIN specifications for seamless fitment in modern executive sedans and crossover utility vehicles.",
    "price": 7150,
    "stock": 11,
    "partNumber": "BT-BSH-60D",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 194,
    "sellerName": "Kolhapur Mahalaxmi Spares (Kolhapur)",
    "sellerLocation": "Kolhapur",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 6,
        "brand": "Hyundai",
        "model": "Verna",
        "year": 2022,
        "variant": "SX"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      },
      {
        "id": 17,
        "brand": "Kia",
        "model": "Seltos",
        "year": 2022,
        "variant": "HTX / GTX"
      }
    ]
  },
  {
    "id": 95,
    "name": "NOCO Genius 5 Automatic Smart Battery Maintainer (5A)",
    "description": "Compact all-in-one universal battery charger, maintainer, trickle charger, and desulfator supporting 6V and 12V automotive batteries.",
    "price": 5490,
    "stock": 15,
    "partNumber": "CH-NCO-GN5",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 195,
    "sellerName": "Solapur Motor Depot (Solapur)",
    "sellerLocation": "Solapur",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 15,
        "brand": "Honda",
        "model": "City",
        "year": 2021,
        "variant": "1.5L i-VTEC"
      }
    ]
  },
  {
    "id": 96,
    "name": "Amaron Go 44Ah Sealed Maintenance Free Battery",
    "description": "Everyday dependable starter battery with high heat tolerance, leak-proof double lid, and integrated charge eye indicator.",
    "price": 4890,
    "stock": 20,
    "partNumber": "BT-AMR-GO44",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 196,
    "sellerName": "Amravati Vidarbha Spares (Amravati)",
    "sellerLocation": "Amravati",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 3,
        "brand": "Maruti",
        "model": "Brezza",
        "year": 2023,
        "variant": "ZXi"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      }
    ]
  },
  {
    "id": 97,
    "name": "Exide InvaMaster Inverter Tubular Heavy Backup Battery (150Ah)",
    "description": "Tall tubular lead-acid deep cycle battery with gauntlet design plates engineered for long power outages and extreme deep discharge recovery.",
    "price": 14200,
    "stock": 5,
    "partNumber": "BT-EXD-IM150",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 197,
    "sellerName": "Nanded Guru Auto Store (Nanded)",
    "sellerLocation": "Nanded",
    "sellerRating": 4.8,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 5,
        "brand": "Hyundai",
        "model": "Creta",
        "year": 2023,
        "variant": "SX / SX(O)"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 13,
        "brand": "Toyota",
        "model": "Innova",
        "year": 2021,
        "variant": "Crysta"
      }
    ]
  },
  {
    "id": 98,
    "name": "Bosch Heavy Duty Battery Cable & Terminal Clamp Set",
    "description": "Pure copper 4-gauge flexible battery leads fitted with heavy-duty anti-spark brass terminal connectors and insulating safety covers.",
    "price": 1199,
    "stock": 35,
    "partNumber": "CB-BSH-BTC",
    "imageUrl": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 198,
    "sellerName": "Bhavnagar Saurashtra Spares (Bhavnagar)",
    "sellerLocation": "Bhavnagar",
    "sellerRating": 4.7,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 4,
        "brand": "Hyundai",
        "model": "i20",
        "year": 2021,
        "variant": "Sportz / Asta"
      },
      {
        "id": 7,
        "brand": "Tata",
        "model": "Nexon",
        "year": 2022,
        "variant": "XZ+ / Fearless"
      },
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      }
    ]
  },
  {
    "id": 99,
    "name": "Microtek Pure Sine Wave Automotive Inverter 900VA",
    "description": "Smart microcontroller-based pure sine wave inverter kit with high-speed transfer switch to safeguard sensitive onboard electronic gadgets.",
    "price": 5850,
    "stock": 9,
    "partNumber": "IV-MCK-900",
    "imageUrl": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 199,
    "sellerName": "Jamnagar Reliance Auto Hub (Jamnagar)",
    "sellerLocation": "Jamnagar",
    "sellerRating": 4.9,
    "compatibleCars": [
      {
        "id": 10,
        "brand": "Mahindra",
        "model": "Scorpio",
        "year": 2020,
        "variant": "S11"
      },
      {
        "id": 11,
        "brand": "Mahindra",
        "model": "Thar",
        "year": 2022,
        "variant": "LX"
      },
      {
        "id": 12,
        "brand": "Mahindra",
        "model": "XUV700",
        "year": 2023,
        "variant": "AX7"
      },
      {
        "id": 14,
        "brand": "Toyota",
        "model": "Fortuner",
        "year": 2022,
        "variant": "4x4 AT"
      }
    ]
  },
  {
    "id": 100,
    "name": "Amaron Black 35Ah Compact Economy Car Battery",
    "description": "Affordable and durable lead-acid battery designed for small entry-level cars, featuring robust bicell polyethylene separators.",
    "price": 3650,
    "stock": 28,
    "partNumber": "BT-AMR-BK35",
    "imageUrl": "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80",
    "categoryId": 6,
    "categoryName": "Batteries & Power",
    "sellerId": 200,
    "sellerName": "Gandhinagar Capital Spares (Gandhinagar)",
    "sellerLocation": "Gandhinagar",
    "sellerRating": 5,
    "compatibleCars": [
      {
        "id": 1,
        "brand": "Maruti",
        "model": "Swift",
        "year": 2022,
        "variant": "VXi / ZXi"
      },
      {
        "id": 2,
        "brand": "Maruti",
        "model": "Baleno",
        "year": 2023,
        "variant": "Delta / Zeta"
      },
      {
        "id": 8,
        "brand": "Tata",
        "model": "Altroz",
        "year": 2021,
        "variant": "XZ / XZ+"
      },
      {
        "id": 9,
        "brand": "Tata",
        "model": "Punch",
        "year": 2023,
        "variant": "Creative"
      }
    ]
  }
];
