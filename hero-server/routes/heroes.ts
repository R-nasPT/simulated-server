import { Router, Request, Response } from "express";
import HeroModel, { IHero } from "../models/Hero";

const router = Router();

// GET /heroes
router.get("/", async (req: Request, res: Response) => {
  try {
    const heroes: IHero[] = await HeroModel.find();

    if (heroes.length === 0) {
      res.status(404).json({ message: "คอลเลกชันไม่มีข้อมูล หรือ ชื่อไม่ถูกต้อง เช่น event เป็น events" });
    } else {
      res.json(heroes);
      console.log("Fetched heroes:", heroes);
    }

  } catch (error: any) {
    console.error("Error fetching heroes:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /heroes/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const hero: IHero | null = await HeroModel.findById(id);

    if (hero) {
      res.json(hero);
    } else {
      res.status(404).json({ message: "Hero not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /heroes
router.post("/", async (req: Request, res: Response) => {
  try {
    // ดึงข้อมูลฮีโร่ใหม่จากข้อมูลที่ส่งมาในร้องขอ
    const newHeroData: IHero = req.body;

    // สร้างฮีโร่ใหม่โดยใช้ HeroModel
    const newHero = new HeroModel(newHeroData);

    // บันทึกฮีโร่ใหม่ลงในฐานข้อมูล
    await newHero.save();

    res.status(201).json({ 
      message: "insert successfully",
      newHero,
     });
  } catch (error: any) {
    console.error("Error creating hero (เกิดข้อผิดพลาดในการสร้างฮีโร่) :", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /heroes/:id
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // ค้นหาฮีโร่ตาม ID
    const existingHero: IHero | null = await HeroModel.findById(id);

    if (!existingHero) {
      return res.status(404).json({ message: "Hero not found (ไม่พบฮีโร่)" });
    }

    // อัปเดตฮีโร่ที่มีอยู่ด้วยข้อมูลใหม่
    Object.assign(existingHero, req.body);

    // บันทึกฮีโร่ที่อัปเดตลงในฐานข้อมูล
    await existingHero.save();

    res.json({ 
      message: "update successfully",
      existingHero,
     });
  } catch (error: any) {
    console.error("Error updating hero (เกิดข้อผิดพลาดในการอัปเดตฮีโร่):", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /heroes/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // ค้นหาฮีโร่ตาม ID และลบ
    const deletedHero: IHero | null = await HeroModel.findByIdAndDelete(id) as unknown as IHero;

    if (deletedHero) {
      res.json({ 
        message: "delete successfully",
        deletedHero,
       });
    } else {
      res.status(404).json({ message: "Hero not found (ไม่พบฮีโร่)" });
    }
  } catch (error: any) {
    console.error("Error deleting hero (เกิดข้อผิดพลาดในการลบฮีโร่):", error);
    res.status(500).json({ error: error.message });
  }
});


export default router;
