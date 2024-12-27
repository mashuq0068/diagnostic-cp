const generateMockDoctors = (page, size) => {
    const totalDoctors = 120; // Total number of doctors to simulate
    const allDoctors = Array.from({ length: totalDoctors }, (_, i) => ({
      nameEn: `Doctor ${i + 1}`,
      age: Math.floor(Math.random() * 30) + 30,
      gender: i % 2 === 0 ? "Male" : "Female",
      bloodGroup: ["A+", "B+", "O+", "AB+"][i % 4],
      phone: `123-456-78${i}`,
      email: `doctor${i}@example.com`,
      photo: "https://via.placeholder.com/150",
      assistantName: `Assistant ${i + 1}`,
      assistantPhone: `123-456-79${i}`,
      yearsOfExperience: Math.floor(Math.random() * 20) + 1,
      rateOfVisit: `${Math.floor(Math.random() * 500) + 100} USD`,
      bmdcNumber: `BMDC-${1000 + i}`,
      bankAccount: `AC-${10000 + i}`,
      bkashAccount: `+8801${i}BKASH`,
      nagadAccount: `+8801${i}NAGAD`,
      initialBalance: `${Math.random() * 1000}`,
      commissionPercentage: `${Math.random() * 10}%`,
    }));
  
    const start = page * size;
    const end = start + size;
    const doctors = allDoctors.slice(start, end);
  
    return {
      doctors,
      totalPages: Math.ceil(totalDoctors / size),
    };
  };
  
  const getAllDoctors = async () => {
    try {
      const { doctors, totalPages } = generateMockDoctors(currentPage, 10);
      setDoctors(doctors);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

    // get all patients
    const getAllPatients = async () => {
      setLoading(true);
      try {
        const queryData = buildQueryParams(queryParams);
        const res = await axios.get(`/patients?${queryData}`);
        setPatientSelectOptions(
          res?.data?.patients?.map((patient) => ({
            value: patient.id,
            label: patient.fullName,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };