const Astrologer = require("../models/astrologer-model")

const register = async(req, res) => {
    try {
        const { name, gender, email, languages, specialties } = req.body;
        const astroExist = await Astrologer.findOne({ email });
        if (astroExist) {
            return res.status(400).json({ msg: "email already exists" });
        }
        const astroCreated = await Astrologer.create({ name, gender, email, languages, specialties });
        res
            .status(201)
            .json({
                msg: "registration successful",
                astroId: astroCreated._id.toString(),
            });

    } catch (error) {
        console.log(error)
    }
}

const astro = async(req, res) => {
    try {
        const astrologers = await Astrologer.find();
        res.status(200).json(astrologers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

const getAstroById = async(req, res) => {
    const astrologerId = req.params.id;
    try {
        const astrologer = await Astrologer.findById(astrologerId);

        if (!astrologer) {
            return res.status(404).json({ error: "Astrologer not found" });
        }

        res.json(astrologer);
    } catch (error) {
        console.error("Error fetching astrologer details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateAstro = async(req, res) => {
    try {
        const astroId = req.params.id;
        const updatedData = req.body;
        console.log(updatedData)
        const existingAstrologer = await Astrologer.findById(astroId);
        if (!existingAstrologer) {
            return res.status(404).json({ msg: 'Astrologer not found' });
        }

        existingAstrologer.set(updatedData);
        // console.log(existingAstrologer)
        const updatedAstrologer = await existingAstrologer.save();
        // console.log(updatedAstrologer)
        res.status(200).json(updatedAstrologer);

    } catch (error) {
        console.log(error);
    }
}


module.exports = { register, astro, updateAstro, getAstroById }
