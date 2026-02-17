import { useEffect, useState } from "react";
import axios from "axios";

interface Wilayah {
  id: string;
  name: string;
}

// In-memory cache
const cache: {
  provinces?: Wilayah[];
  regencies?: Record<string, Wilayah[]>;
  districts?: Record<string, Wilayah[]>;
  villages?: Record<string, Wilayah[]>;
} = {
  regencies: {},
  districts: {},
  villages: {},
};

export const useWilayah = () => {
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);
  const [villages, setVillages] = useState<Wilayah[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= PROVINCES =================
  useEffect(() => {
    if (cache.provinces) {
      setProvinces(cache.provinces);
      return;
    }

    setLoading(true);
    axios
      .get("https://yogisepdu.github.io/api-wilayah-indonesia/api/provinces.json")
      .then((res) => {
        cache.provinces = res.data;
        setProvinces(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // ================= REGENCIES =================
  useEffect(() => {
    if (!selectedProvince) return;

    if (cache.regencies?.[selectedProvince]) {
      setRegencies(cache.regencies[selectedProvince]);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://yogisepdu.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
      )
      .then((res) => {
        cache.regencies![selectedProvince] = res.data;
        setRegencies(res.data);
        setSelectedRegency("");
        setDistricts([]);
        setVillages([]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedProvince]);

  // ================= DISTRICTS =================
  useEffect(() => {
    if (!selectedRegency) return;

    if (cache.districts?.[selectedRegency]) {
      setDistricts(cache.districts[selectedRegency]);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://yogisepdu.github.io/api-wilayah-indonesia/api/districts/${selectedRegency}.json`,
      )
      .then((res) => {
        cache.districts![selectedRegency] = res.data;
        setDistricts(res.data);
        setSelectedDistrict("");
        setVillages([]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedRegency]);

  // ================= VILLAGES =================
  useEffect(() => {
    if (!selectedDistrict) return;

    if (cache.villages?.[selectedDistrict]) {
      setVillages(cache.villages[selectedDistrict]);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://yogisepdu.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`,
      )
      .then((res) => {
        cache.villages![selectedDistrict] = res.data;
        setVillages(res.data);
        setSelectedVillage("");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [selectedDistrict]);

  // ================= POSTAL CODE =================
  useEffect(() => {
    if (selectedVillage) {
      setPostalCode(selectedVillage.slice(0, 5));
    }
  }, [selectedVillage]);

  return {
    provinces,
    regencies,
    districts,
    villages,
    selectedProvince,
    setSelectedProvince,
    selectedRegency,
    setSelectedRegency,
    selectedDistrict,
    setSelectedDistrict,
    selectedVillage,
    setSelectedVillage,
    postalCode,
    loading,
  };
};
