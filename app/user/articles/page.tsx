"use client";

import Navbar from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Footer from "@/components/ui/Footer";
import { ArticleType } from "@/types/types";
import ArticleCard from "@/components/ui/ArticleCard";

// const dataDummy = {
//   "data": [
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi udara, yang digunakan untuk mengangkut penumpang dan barang.", 
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRki_kenmX2B8uDgq-OP1WY4ke-73Xiu1Gcqg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "8ed3ce4c-9701-44ce-a279-7796128a4788",
//       "userId": "ae9f3927-2996-43fe-a8d5-0116c40b5642",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "create test baru",
//       "content": "create test baru",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvuA4_lrnaIrzr4fYmJmiOvksZTlUlzwbneA&s",
//       "createdAt": "2025-05-10T01:06:49.409Z",
//       "updatedAt": "2025-05-10T01:06:49.409Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "ae9f3927-2996-43fe-a8d5-0116c40b5642",
//         "username": "cristiano"
//       }
//     },
//     {
//       "id": "93b3852b-87aa-4754-8586-98fdbdd9f350",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "pesawat luar angkasa",
//       "content": "ulang alik merupakan teknologi zaman 2099",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAhYQs3ooOx61CW5gESHSQyYc03gTwIgaSqg&s",
//       "createdAt": "2025-05-10T03:46:33.913Z",
//       "updatedAt": "2025-05-10T03:46:33.913Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "aae8f1c5-ab87-4734-9085-a065acf8495d",
//       "userId": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//       "categoryId": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//       "title": "test rar",
//       "content": "<p>dawdwad adawdawdwad awdaw</p>",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2IapAa2KuxshlvXjQg2gqJcTux3gKyWqrkA&s",
//       "createdAt": "2025-05-09T19:25:12.295Z",
//       "updatedAt": "2025-05-09T19:25:12.295Z",
//       "category": {
//         "id": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//         "userId": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//         "name": "Transportasi",
//         "createdAt": "2025-05-09T10:02:33.358Z",
//         "updatedAt": "2025-05-09T16:34:01.712Z"
//       },
//       "user": {
//         "id": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//         "username": "adminAku"
//       }
//     },
//     {
//       "id": "c0add3d8-4455-4079-b3f1-e8add59e79c9",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "Perkembangan BlockChain di sektor Finance",
//       "content": "tractor ini digunakan untuk membajak sawah",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8cgAo882oIEqJIWbtbT3TCcEW-r4Wgk3tgw&s",
//       "createdAt": "2025-05-09T18:45:38.636Z",
//       "updatedAt": "2025-05-10T06:06:23.142Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "c3addd76-6549-4016-b8c6-2b1e52d9d097",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//       "title": "transportasi umum",
//       "content": "transportasi ini digunakan untuk mengakut sapi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-0CWRaN5A6-KU1pwbyKyHm8VznwbDI8Sj_A&s",
//       "createdAt": "2025-05-10T03:08:42.976Z",
//       "updatedAt": "2025-05-10T03:08:42.976Z",
//       "category": {
//         "id": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//         "userId": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//         "name": "Transportasi",
//         "createdAt": "2025-05-09T10:02:33.358Z",
//         "updatedAt": "2025-05-09T16:34:01.712Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "e4257fc9-6835-40b8-8dd6-dc86e549719d",
//       "userId": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//       "categoryId": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//       "title": "SDM Transportasi Unggul untuk Transportasi Berkelanjutan",
//       "content": "Konten artikel panjang dengan pembahasan tentang SDM transportasi nasional...",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpo_TttHWoNDD7XOq7hrxJGiDH-UMPDtvJpQ&s",
//       "createdAt": "2025-05-09T11:08:16.322Z",
//       "updatedAt": "2025-05-09T11:08:16.322Z",
//       "category": {
//         "id": "b66711e7-8208-40c8-95c2-7a9f9b550c24",
//         "userId": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//         "name": "Transportasi",
//         "createdAt": "2025-05-09T10:02:33.358Z",
//         "updatedAt": "2025-05-09T16:34:01.712Z"
//       },
//       "user": {
//         "id": "7889fea3-658e-4234-a679-f85c5cb14e2e",
//         "username": "adminAku"
//       }
//     },
//     {
//       "id": "1",
//       "userId": "user-01",
//       "categoryId": "cat-01",
//       "title": "Tren Kendaraan Listrik 2025",
//       "content": "Kendaraan listrik semakin diminati karena ramah lingkungan.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2PM-uu4967SfVNU1uc3ZRx4zDrJQMHGFLg&s",
//       "createdAt": "2025-05-01T08:00:00.000Z",
//       "updatedAt": "2025-05-01T08:00:00.000Z",
//       "category": {
//         "id": "cat-01",
//         "userId": "admin-01",
//         "name": "Transportasi",
//         "createdAt": "2025-04-01T08:00:00.000Z",
//         "updatedAt": "2025-04-01T08:00:00.000Z"
//       },
//       "user": {
//         "id": "user-01",
//         "username": "johndoe"
//       }
//     },
//     {
//       "id": "2",
//       "userId": "user-02",
//       "categoryId": "cat-02",
//       "title": "AI dalam Dunia Medis",
//       "content": "AI dapat membantu diagnosis lebih cepat dan akurat.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpCAxgG9oS88GSKj8EeAYu_Xwls8OmEpR7Uw&s",
//       "createdAt": "2025-05-02T09:00:00.000Z",
//       "updatedAt": "2025-05-02T09:00:00.000Z",
//       "category": {
//         "id": "cat-02",
//         "userId": "admin-02",
//         "name": "Technology",
//         "createdAt": "2025-04-02T09:00:00.000Z",
//         "updatedAt": "2025-04-02T09:00:00.000Z"
//       },
//       "user": {
//         "id": "user-02",
//         "username": "janedoe"
//       }
//     },
//     {
//       "id": "3",
//       "userId": "user-03",
//       "categoryId": "cat-03",
//       "title": "Inovasi Drone untuk Pertanian",
//       "content": "Drone digunakan untuk memantau tanaman dan penyiraman otomatis.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0HRMAyQFl8RuJ3iYMKrDyst-GRB3LAQSq8g&s",
//       "createdAt": "2025-05-03T10:00:00.000Z",
//       "updatedAt": "2025-05-03T10:00:00.000Z",
//       "category": {
//         "id": "cat-03",
//         "userId": "admin-03",
//         "name": "Agrikultur",
//         "createdAt": "2025-04-03T10:00:00.000Z",
//         "updatedAt": "2025-04-03T10:00:00.000Z"
//       },
//       "user": {
//         "id": "user-03",
//         "username": "petaniTekno"
//       }
//     },
//     {
//       "id": "4",
//       "userId": "user-01",
//       "categoryId": "cat-02",
//       "title": "5G Mengubah Internet Dunia",
//       "content": "Dengan kecepatan tinggi, 5G membuka era baru konektivitas.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-04T11:00:00.000Z",
//       "updatedAt": "2025-05-04T11:00:00.000Z",
//       "category": {
//         "id": "cat-02",
//         "userId": "admin-02",
//         "name": "Technology",
//         "createdAt": "2025-04-02T09:00:00.000Z",
//         "updatedAt": "2025-04-02T09:00:00.000Z"
//       },
//       "user": {
//         "id": "user-01",
//         "username": "johndoe"
//       }
//     },
//     {
//       "id": "5",
//       "userId": "user-04",
//       "categoryId": "cat-04",
//       "title": "Peran Kereta Cepat di Indonesia",
//       "content": "Kereta cepat mempercepat konektivitas antar kota besar.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-05T12:00:00.000Z",
//       "updatedAt": "2025-05-05T12:00:00.000Z",
//       "category": {
//         "id": "cat-04",
//         "userId": "admin-04",
//         "name": "Transportasi",
//         "createdAt": "2025-04-04T10:00:00.000Z",
//         "updatedAt": "2025-04-04T10:00:00.000Z"
//       },
//       "user": {
//         "id": "user-04",
//         "username": "transindo"
//       }
//     },
//     {
//       "id": "6",
//       "userId": "user-05",
//       "categoryId": "cat-02",
//       "title": "Machine Learning untuk Pemula",
//       "content": "Machine learning adalah cabang AI yang mempelajari data.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-06T13:00:00.000Z",
//       "updatedAt": "2025-05-06T13:00:00.000Z",
//       "category": {
//         "id": "cat-02",
//         "userId": "admin-02",
//         "name": "Technology",
//         "createdAt": "2025-04-02T09:00:00.000Z",
//         "updatedAt": "2025-04-02T09:00:00.000Z"
//       },
//       "user": {
//         "id": "user-05",
//         "username": "aiHunter"
//       }
//     },
//     {
//       "id": "7",
//       "userId": "user-06",
//       "categoryId": "cat-05",
//       "title": "Otomatisasi Pabrik di Era 4.0",
//       "content": "Industri kini menggunakan robot untuk efisiensi.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-07T14:00:00.000Z",
//       "updatedAt": "2025-05-07T14:00:00.000Z",
//       "category": {
//         "id": "cat-05",
//         "userId": "admin-05",
//         "name": "Industri",
//         "createdAt": "2025-04-05T11:00:00.000Z",
//         "updatedAt": "2025-04-05T11:00:00.000Z"
//       },
//       "user": {
//         "id": "user-06",
//         "username": "roboticGuy"
//       }
//     },
//     {
//       "id": "8",
//       "userId": "user-07",
//       "categoryId": "cat-02",
//       "title": "Pengenalan ChatGPT untuk Mahasiswa",
//       "content": "ChatGPT membantu belajar dan menyelesaikan tugas lebih efisien.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-08T15:00:00.000Z",
//       "updatedAt": "2025-05-08T15:00:00.000Z",
//       "category": {
//         "id": "cat-02",
//         "userId": "admin-02",
//         "name": "Technology",
//         "createdAt": "2025-04-02T09:00:00.000Z",
//         "updatedAt": "2025-04-02T09:00:00.000Z"
//       },
//       "user": {
//         "id": "user-07",
//         "username": "aiStudent"
//       }
//     },
//     {
//       "id": "9",
//       "userId": "user-08",
//       "categoryId": "cat-03",
//       "title": "Teknologi Irigasi Otomatis",
//       "content": "Sistem irigasi kini bisa dikontrol lewat smartphone.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-09T16:00:00.000Z",
//       "updatedAt": "2025-05-09T16:00:00.000Z",
//       "category": {
//         "id": "cat-03",
//         "userId": "admin-03",
//         "name": "Agrikultur",
//         "createdAt": "2025-04-03T10:00:00.000Z",
//         "updatedAt": "2025-04-03T10:00:00.000Z"
//       },
//       "user": {
//         "id": "user-08",
//         "username": "farmerTech"
//       }
//     },
//     {
//       "id": "10",
//       "userId": "user-09",
//       "categoryId": "cat-02",
//       "title": "Quantum Computing dan Masa Depan",
//       "content": "Quantum computing akan merevolusi pemrosesan data.",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T17:00:00.000Z",
//       "updatedAt": "2025-05-10T17:00:00.000Z",
//       "category": {
//         "id": "cat-02",
//         "userId": "admin-02",
//         "name": "Technology",
//         "createdAt": "2025-04-02T09:00:00.000Z",
//         "updatedAt": "2025-04-02T09:00:00.000Z"
//       },
//       "user": {
//         "id": "user-09",
//         "username": "quantumNerd"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRki_kenmX2B8uDgq-OP1WY4ke-73Xiu1Gcqg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDo2-v2t7qNyfv6yHC2FM42YJj_kgC6H0spQ&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },{
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_KIf62P0jWcw-rt0YWcbluUSu3Ht30Fyfg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_KIf62P0jWcw-rt0YWcbluUSu3Ht30Fyfg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_KIf62P0jWcw-rt0YWcbluUSu3Ht30Fyfg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs_KIf62P0jWcw-rt0YWcbluUSu3Ht30Fyfg&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     },
//     {
//       "id": "61c7a36d-fdf4-4fe8-a714-e8fe09e7725e",
//       "userId": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//       "categoryId": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//       "title": "helikopter",
//       "content": "helikopter merupakan alat transportasi",
//       "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73pDMF7HhMNg7V6OJ0yby2rG1eULBGaGP0A&s",
//       "createdAt": "2025-05-10T03:51:24.209Z",
//       "updatedAt": "2025-05-10T03:51:24.209Z",
//       "category": {
//         "id": "9155d16b-fe6b-4056-b0d4-82104a4c6539",
//         "userId": "cc98b87a-5129-4ee5-bc8d-69f2a6c24fcb",
//         "name": "Technology",
//         "createdAt": "2025-05-09T15:17:44.850Z",
//         "updatedAt": "2025-05-09T15:17:44.850Z"
//       },
//       "user": {
//         "id": "d80e40ed-9236-49d8-b4b8-d6f1ffaae868",
//         "username": "testlagiadmin"
//       }
//     }
//   ],
//   "total": 25,
//   "page": 1,
//   "limit": 25
// }


export default function UserArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (!token || role !== 'User') {
      router.push('/')
    } else {
      fetchArticles()  //setArticles(dataDummy.data)
    }
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://test-fe.mysellerpintar.com/api/articles')
      setArticles(response.data.data)
    } catch (error) {
      console.error('Gagal mengambil data artikel:', error)
    }
  }


  
  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const uniqueCategories = Array.from(
    new Set(articles.map((a) => a.category.name))
  );

  const filteredArticles = articles.filter((article) => {
    const matchCategory = selectedCategory
      ? article.category.name === selectedCategory
      : true;
    const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0); // Scroll to top when changing pages
    }
  };

  return (
    <>
      <div className="bg-blue-600 text-white py-5 px-4 text-center">
        <Navbar/>
        <p className="text-sm mt-15">Blog genzet</p>
        <h1 className="text-3xl font-bold mb-2">
          The Journal: Design Resources, Interviews, and Industry News
        </h1>
        <p className="text-sm">Your daily dose of design insights!</p>
        <div className=" mt-6 mb-20 flex flex-col sm:flex-row justify-center items-center gap-4">
  <div className="relative">
    <select
      className="bg-white pl-3 pr-8 py-2 rounded-md text-black appearance-none min-w-[150px]"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">Select category</option>
      {uniqueCategories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
  
  <div className="relative flex-grow max-w-md">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Search 
      className="w-4 h-4 text-gray-500"
      />
    </div>
    <input
      type="text"
      placeholder="Search articles"
      className="bg-white pl-10 pr-3 py-2 rounded-md text-black w-full"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
</div>
      </div>

      <div 
  key={`page-${currentPage}`} 
  className=" max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
>
  {currentArticles.map((article) => (
    <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* Pagination controls */}
{filteredArticles.length > 0 && (
  <div className="flex justify-center items-center gap-2 py-8">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className={`px-4 py-2 flex items-center ${
        currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      <span className="mr-1">&#10094;</span> Previous
    </button>

    {/* First page */}
    <button
      onClick={() => setCurrentPage(1)}
      className={`w-8 h-8 flex items-center justify-center rounded-md ${
        currentPage === 1 ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      1
    </button>

    {/* Show ellipsis if there are pages between 1 and currentPage */}
    {currentPage > 3 && <span className="px-2">...</span>}

    {/* Show page numbers around current page */}
    {Array.from({ length: totalPages }).map((_, index) => {
      const pageNumber = index + 1;
      // Only show page numbers 2 to totalPages-1, and only those close to current page
      if (pageNumber !== 1 && pageNumber !== totalPages) {
        if (
          (currentPage > 2 && pageNumber === currentPage - 1) || 
          pageNumber === currentPage || 
          (currentPage < totalPages - 1 && pageNumber === currentPage + 1)
        ) {
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === pageNumber ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {pageNumber}
            </button>
          );
        }
      }
      return null;
    })}

    {/* Show ellipsis if there are pages between currentPage and last page */}
    {currentPage < totalPages - 2 && <span className="px-2">...</span>}

    {/* Last page - only show if there's more than one page */}
    {totalPages > 1 && (
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={`w-8 h-8 flex items-center justify-center rounded-md ${
          currentPage === totalPages ? "border border-gray-300 font-medium" : "text-gray-700 hover:text-blue-600"
        }`}
      >
        {totalPages}
      </button>
    )}

    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 flex items-center ${
        currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:text-blue-600"
      }`}
    >
      Next <span className="ml-1">&#10095;</span>
    </button>
  </div>
)}
<div className="mt-12">
<Footer/>
</div>
    </>
  );
}
