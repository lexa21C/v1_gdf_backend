const User = require("../models/Users.js");
const ApiStructure = require('../helpers/responseApi.js');
const Profile = require("../models/Profiles.js");
const Tematic =  require("../models/Thematic_lines.js")
const { body, validationResult } = require("express-validator");
const { encrypt } = require("../helpers/Bycript");
const { validateProfileExistence } = require('../helpers/user/registar/profileValidation.js'); 

// Listar usuarios
exports.allUser = async (req, res) => {
  const apiStructure = new ApiStructure();

  try {
      const users = await User.find({}).select('-password')
          .populate("type_profile")
          .populate('formation_program')
          .populate('training_center');

      if (users.length > 0) {
          apiStructure.setResult(users);
      } else {
          apiStructure.setStatus(404, "Info", "No hay usuarios disponibles");
      }
  } catch (error) {
      console.error("Error al obtener usuarios:", error);
      apiStructure.setStatus(500, "Error interno", "Ocurrió un error interno al obtener usuarios.");
  }

  return res.json(apiStructure.toResponse());
};


exports.createUser = async (req, res) => {
  let apiStructure = new ApiStructure();
  let { complete_names, email, password, type_profile, formation_program, training_center } = req.body;
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });    
  }
  const existingProfile = await Profile.findOne({ type_profile: type_profile });
 //* Asigna el resultado de la búsqueda a la variable 'type_profile
 
  // Cifra la variable '"password", password' utilizando una función de cifrado y guarda el resultado en 'passwordHash'
  const passwordHash = await encrypt(password);
  
  // Crea el usuario si todo está en orden
  try {
    const newUser = await User.create({
      complete_names,
      email,
      password: passwordHash,
      type_profile: existingProfile, // Asegúrate de asignar el perfil existente
      formation_program,
      training_center
    });
  
    apiStructure.setResult(newUser, "Usuario Creado Exitosamente");
    return res.json(apiStructure.toResponse()); // Envía la respuesta al cliente aquí
  } catch (err) {
    apiStructure.setStatus("Failed", 400, err.message);
    return res.json(apiStructure.toResponse()); // Envía la respuesta al cliente aquí en caso de error
  }
};


//Mi Usuario
exports.myUser = async (req, res) => {
  let apiStructure = new ApiStructure();
  let id_user = req.params.id_user;

  const user = await User.findOne({ _id: id_user }).populate('formation_program').populate('training_center').populate('type_profile');

  if (user) {
    apiStructure.setResult(user);
  } else {
    apiStructure.setStatus(404, "info", "El usuario no existe");
  }
  res.json(apiStructure.toResponse());
};
//Actualizar usuario
exports.UpdateUser = async (req, res) => {
  const { complete_names, email, password, type_profile, formation_program } = req.body;
  const { id_user } = req.params;
  let apiStructure = new ApiStructure();

  try {
    // Check if the new email already exists in the database
    const existingUser = await User.findOne({ email: email, _id: { $ne: id_user } });
    if (existingUser) {
      console.log("existe")
      apiStructure.setStatus("Failed", 400, "Email already exists");
      return res.json(apiStructure.toResponse());
    }

    if (password) {
      const passwordHash = await encrypt(password);
      const user = await User.findByIdAndUpdate(id_user, {
        complete_names,
        email,
        password: passwordHash,
        type_profile,
        formation_program,
      },{ new: true });

      
      apiStructure.setResult(user, "Usuario Actualizado Exitosamente");
    } else {
      await User.findByIdAndUpdate(id_user, {
        complete_names,
        email,
        type_profile,
        formation_program,
      });
      apiStructure.setResult({}, "Usuario Actualizado Exitosamente");
    }

   
    return res.json(apiStructure.toResponse());
  } catch (err) {
    apiStructure.setStatus("Failed", 400, err.message);
    res.json(apiStructure.toResponse());
    return res.json(apiStructure.toResponse());
  }
  
};


//Eliminar usuario
exports.deleteUser = async (req, res) => {
  let apiStructure = new ApiStructure();
  let id_user = req.params.id_user;

  const users = await User.findById({ _id: id_user });

  if (users) {
    apiStructure.setResult("Eliminado Satisfactoriamente");
  } else {
    apiStructure.setStatus(404, "info", "No existe el usuario");
  }

  await User.findByIdAndDelete({ _id: id_user });
  res.json(apiStructure.toResponse());
};

exports.ProfileUser = async (req, res) => {
  let apiStructure = new ApiStructure();
  let user = req.body;
  let id_user = req.params.id_user;

  const users = await User.find({ _id: id_user }).populate("type_profile");
  //const users = await User.find(user, {complete_names :0 ,  email : 0, password :0,  _id :0}).populate('type_profile')
  if (users.length > 0) {
    apiStructure.setResult(users);
  } else {
    apiStructure.setStatus(404, "info", "No hay usuarios");
  }

  res.json(apiStructure.toResponse());
};

exports.filterUser = async (req, res) => {
  let apiStructure = new ApiStructure();
  let { buscar, buscarId } = req.params;
  console.log('buscar')
  await User.find({ [buscar]: buscarId }).select("email complete_names ")
    .then((success) => {
      if (success.length == 0) {
        apiStructure.setStatus(404, "info", "User null");
      } else {
        console.log('Valor encontrado:', success); 
        apiStructure.setResult(success);
      }
    })
    .catch((err) => {
      apiStructure.setStatus(500, "error", err);
    });
  res.json(apiStructure.toResponse());
};

exports.progrmsFormationUsers = async (req, res) => {
  let apiStructure = new ApiStructure();
  let { id_user } = req.params;
  // const users = await User.findById({ _id:id_user});

  let array = [];
  // for(let i=0;i<users.formation_program.length;i++){
  //     const formationProgram= await Formation_programs.findOne({_id:users.formation_program[i]})

  // }
  function generarNumeros() {
    let numeros = new Set();
    while (numeros.size < 1500) {
      const numero = Math.floor(Math.random() * 90000000) + 10000000;
      numeros.add(numero);
    }
    return Array.from(numeros);
  }

  const numerosGenerados = generarNumeros();
  res.json(numerosGenerados);

  // if (array.length > 0) {
  //   estructuraapi.setResult(array)
  // } else {
  //   estructuraapi.setStatus(404, "info", "No hay Programas de formacion")
  // }
  // res.json(estructuraapi.toResponse());
};

exports.filterFormationPrograms = async (req, res) => {
  let apiStructure = new ApiStructure();
  //let {thematic_line, thematic_line_description} = req.body
  
  // await Tematic.create({thematic_line, thematic_line_description}).then((success) => {
  //   estructuraapi.setResult(success)
  // }).catch((error) => {
  //   estructuraapi.setStatus(500, "No se pudo crear");
  // })
  const {thematic_linesId} = req.params
  const filter = await User.find({thematic_lines:thematic_linesId})
  if (filter.length > 0) {
    apiStructure.setResult(filter);
  } else {
    apiStructure.setStatus(404, "No hay usuarios");
  }
  res.json(apiStructure.toResponse());
};



