import React from 'react';

export const translations: Record<string, any> = {
  id: {
    nav: { title: "Tugas Akhir" },
    hero: {
      badge: "Tugas Akhir Program Studi Sains Atmosfer dan Keplanetan",
      title: "Prediksi Curah Hujan ITERA dengan Model WRF & Ensemble",
      desc: "Evaluasi akurasi model Weather Research and Forecasting (WRF) menggunakan data GFS dan ERA5 dengan teknik Ensemble untuk menghasilkan prediksi hujan yang lebih presisi.",
      btnResult: "Lihat Hasil",
      btnMethod: "Metodologi"
    },
    methodology: {
      title: "Alur Penelitian",
      desc: "Tahapan dari pengolahan data mentah hingga menghasilkan prediksi ensemble.",
      steps: [
        {
          title: "Data Input",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>Penelitian ini menggunakan dua jenis data cuaca global sebagai kondisi awal (<em>initial condition</em>) untuk model:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>GFS-FNL (Global Forecast System - Final Analysis):</strong> Data dari Amerika Serikat (NCEP/NOAA) dengan resolusi spasial 1.0° x 1.0°.</li>
                <li><strong>ERA5:</strong> Data reanalisis dari Eropa (ECMWF) dengan resolusi spasial yang lebih tinggi yaitu 0.25° x 0.25°.</li>
              </ul>
              <p>Kedua data ini dibandingkan untuk melihat mana yang memberikan hasil prediksi hujan paling mendekati kondisi nyata di wilayah ITERA.</p>
            </div>
          )
        },
        {
          title: "Model WRF",
          desc: "10 Skema Parameterisasi",
          details: (
            <div className="space-y-4">
              <p><strong>WRF (Weather Research and Forecasting)</strong> adalah perangkat lunak pemodelan cuaca. Karena dinamika atmosfer sangat kompleks, WRF menggunakan "skema parameterisasi" untuk menyederhanakan proses alam yang skalanya terlalu kecil untuk dihitung secara langsung, seperti proses pembentukan rintik hujan.</p>
              <p>Dalam penelitian ini, diuji <strong>10 kombinasi skema yang berbeda</strong> (disebut <em>member</em>). Kombinasi ini memvariasikan skema <em>Cumulus</em> (konveksi awan) dan <em>Microphysics</em> (proses air dan es di dalam awan) untuk mencari pengaturan yang paling sesuai dengan karakteristik cuaca di Lampung.</p>
            </div>
          )
        },
        {
          title: "Koreksi Bias",
          desc: "Linear Scaling & Quantile Mapping",
          details: (
            <div className="space-y-4">
              <p>Hasil keluaran dari model komputer biasanya tidak sepenuhnya akurat dan memiliki "bias" atau penyimpangan sistematis. Oleh karena itu, diperlukan tahap perbaikan menggunakan metode statistik.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Linear Scaling:</strong> Menyesuaikan rata-rata hasil prediksi agar selaras dengan rata-rata data observasi di lapangan. Metode ini terbukti paling efektif di penelitian ini.</li>
                <li><strong>Quantile Mapping:</strong> Menyesuaikan seluruh bentuk distribusi data prediksi agar menyerupai distribusi data observasi.</li>
              </ul>
            </div>
          )
        },
        {
          title: "Ensemble",
          desc: "Mean, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p>Daripada hanya mengandalkan satu model prediksi, teknik <strong>Ensemble</strong> menggabungkan beberapa model sekaligus untuk mendapatkan hasil yang lebih representatif dan menekan tingkat ketidakpastian.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Ensemble 1 (Mean):</strong> Mengambil nilai rata-rata dari semua model yang disimulasikan.</li>
                <li><strong>Ensemble 2 (RMSE-Corr):</strong> Memberikan bobot lebih besar pada model yang memiliki tingkat kesalahan (RMSE) kecil dan korelasi tinggi.</li>
                <li><strong>Ensemble 3 (POD-FAR):</strong> Memberikan bobot lebih besar pada model yang akurat mendeteksi hujan (POD tinggi) dan minim memberikan alarm palsu (FAR rendah).</li>
              </ul>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "Hasil Penelitian",
      desc: "Temuan utama dari hasil simulasi dan verifikasi model.",
      items: [
        {
          title: "Model Tunggal Terbaik",
          desc: "Korelasi (r) = 0.91, RMSE = 21.23 mm",
          details: (
            <div className="space-y-4">
              <p>Dari 20 simulasi yang dilakukan (10 menggunakan data GFS dan 10 menggunakan ERA5), <strong>Member 9 dari WRF-ERA5</strong> terbukti sebagai model tunggal yang paling akurat.</p>
              <p>Model ini menggunakan kombinasi parameterisasi <strong>Betts-Miller-Janjic (Cumulus)</strong> dan <strong>WSM 6 (Microphysics)</strong>. Nilai korelasi 0.91 menunjukkan bahwa pola hujan yang diprediksi sangat mirip dengan kejadian aslinya, dan nilai error (RMSE) sebesar 21.23 mm adalah salah satu yang terendah.</p>
            </div>
          )
        },
        {
          title: "Ensemble Terbaik",
          desc: "CSI Tertinggi: 0.60 (Bobot POD-FAR)",
          details: (
            <div className="space-y-4">
              <p><strong>Teknik Ensemble</strong> adalah metode menggabungkan beberapa model prediksi untuk mendapatkan hasil yang lebih baik dan mengurangi ketidakpastian.</p>
              <p><strong>Ensemble 3</strong> menggunakan pembobotan berdasarkan seberapa sering model benar mendeteksi hujan (POD) dikurangi seberapa sering model salah mendeteksi hujan (FAR). Hasilnya, Ensemble 3 dari data ERA5 mendapatkan skor CSI (Critical Success Index) tertinggi yaitu 0.60, yang berarti sangat seimbang dan akurat dalam mendeteksi kejadian hujan tanpa banyak memberikan peringatan keliru.</p>
            </div>
          )
        },
        {
          title: "Koreksi Bias Optimal",
          desc: "Rata-rata RMSE: 25.10 mm (ERA5) & 25.95 mm (GFS)",
          details: (
            <div className="space-y-4">
              <p>Model cuaca seringkali memiliki penyimpangan sistematis, misalnya cenderung memprediksi hujan lebih lebat dari aslinya. Untuk mengatasi hal ini, dilakukan <strong>Koreksi Bias</strong>.</p>
              <p>Metode <strong>Linear Scaling</strong> terbukti lebih baik daripada Quantile Mapping dalam penelitian ini. Linear Scaling berhasil menurunkan nilai error (RMSE) secara konsisten, sehingga hasil prediksi model menjadi lebih mendekati data observasi di lapangan.</p>
            </div>
          )
        },
        {
          title: "Parameterisasi Terbaik",
          desc: "Sangat cocok untuk hujan konvektif di daerah tropis",
          details: (
            <div className="space-y-4">
              <p><strong>Parameterisasi</strong> adalah metode yang digunakan model komputer untuk menyederhanakan proses alam yang sangat rumit, seperti pembentukan awan.</p>
              <p>Kombinasi <strong>WSM6 (Mikrofisis)</strong> dan <strong>Kain-Fritsch (Kumulus)</strong> muncul berkali-kali sebagai yang terbaik. WSM6 sangat baik karena memperhitungkan partikel es (graupel) yang berperan penting dalam pembentukan hujan lebat di daerah tropis seperti Lampung. Sementara itu, Kain-Fritsch sangat responsif terhadap udara lembap yang naik dengan cepat.</p>
            </div>
          )
        },
        {
          title: "Karakteristik GFS",
          desc: "Lebih sensitif mendeteksi hujan intensitas rendah",
          details: (
            <div className="space-y-4">
              <p><strong>GFS (Global Forecast System)</strong> adalah salah satu data cuaca global yang digunakan sebagai input awal model.</p>
              <p>Berdasarkan hasil uji ROC, model yang menggunakan data GFS terbukti lebih optimal dan sensitif dalam mendeteksi <strong>hujan ringan (di bawah 10 mm)</strong>. Jika fokus prediksi adalah gerimis atau hujan kecil, data GFS memberikan hasil yang lebih baik.</p>
            </div>
          )
        },
        {
          title: "Karakteristik ERA5",
          desc: "Lebih akurat pada intensitas hujan yang lebih tinggi",
          details: (
            <div className="space-y-4">
              <p><strong>ERA5</strong> adalah data cuaca global dari Eropa (ECMWF) yang memiliki resolusi sangat tinggi.</p>
              <p>Berbeda dengan GFS, model yang menggunakan data ERA5 menunjukkan keunggulan dalam memprediksi <strong>hujan sedang hingga lebat (di atas 10 mm)</strong>. Model ini lebih andal saat mendeteksi cuaca ekstrem, sehingga sangat direkomendasikan untuk sistem peringatan dini banjir atau cuaca buruk.</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "Visualisasi Data",
      desc: "Perbandingan performa model WRF-GFS dan WRF-ERA5 setelah dilakukan koreksi bias Linear Scaling.",
      rmse: "RMSE (Root Mean Square Error)",
      rmseDesc: "Semakin rendah nilai RMSE, semakin baik performa model dalam memprediksi curah hujan.",
      corr: "Korelasi Pearson (r)",
      corrDesc: "Semakin mendekati angka 1, semakin kuat korelasi prediksi dengan data observasi di lapangan."
    },
    gallery: {
      title: "Galeri Simulasi Model",
      desc: "Visualisasi hasil simulasi dari masing-masing member untuk data GFS dan ERA5. Klik pada model untuk membandingkan.",
      compare: "Bandingkan Model",
      addCompare: "Tambah Model untuk Dibandingkan (Maks 4)"
    },
    footer: {
      program: "Program Studi Sains Atmosfer dan Keplanetan - Institut Teknologi Sumatera",
      madeWith: "Dibuat dengan ❤️ oleh",
      copyright: "Hak Cipta © 2024. Seluruh hak dilindungi."
    },
    contactMe: "Hubungi Saya"
  },
  en: {
    nav: { title: "Final Project" },
    hero: {
      badge: "Final Project of Atmospheric and Planetary Sciences",
      title: "ITERA Rainfall Prediction with WRF & Ensemble Model",
      desc: "Evaluation of Weather Research and Forecasting (WRF) model accuracy using GFS and ERA5 data with Ensemble technique to produce more precise rainfall predictions.",
      btnResult: "View Results",
      btnMethod: "Methodology"
    },
    methodology: {
      title: "Research Workflow",
      desc: "Stages from raw data processing to producing ensemble predictions.",
      steps: [
        {
          title: "Data Input",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>This research uses two types of global weather data as <em>initial conditions</em> for the model:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>GFS-FNL (Global Forecast System - Final Analysis):</strong> Data from the United States (NCEP/NOAA) with a spatial resolution of 1.0° x 1.0°.</li>
                <li><strong>ERA5:</strong> Reanalysis data from Europe (ECMWF) with a higher spatial resolution of 0.25° x 0.25°.</li>
              </ul>
              <p>Both data are compared to see which provides rainfall prediction results closest to actual conditions in the ITERA region.</p>
            </div>
          )
        },
        {
          title: "WRF Model",
          desc: "10 Parameterization Schemes",
          details: (
            <div className="space-y-4">
              <p><strong>WRF (Weather Research and Forecasting)</strong> is weather modeling software. Because atmospheric dynamics are highly complex, WRF uses "parameterization schemes" to simplify natural processes that are too small to be calculated directly, such as raindrop formation.</p>
              <p>In this study, <strong>10 different scheme combinations</strong> (called <em>members</em>) were tested. These combinations vary the <em>Cumulus</em> (cloud convection) and <em>Microphysics</em> (water and ice processes within clouds) schemes to find the most suitable settings for Lampung's weather characteristics.</p>
            </div>
          )
        },
        {
          title: "Bias Correction",
          desc: "Linear Scaling & Quantile Mapping",
          details: (
            <div className="space-y-4">
              <p>Computer model outputs are usually not entirely accurate and have systematic "bias" or deviations. Therefore, a correction stage using statistical methods is required.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Linear Scaling:</strong> Adjusts the average prediction results to align with the average field observation data. This method proved most effective in this study.</li>
                <li><strong>Quantile Mapping:</strong> Adjusts the entire shape of the prediction data distribution to resemble the observation data distribution.</li>
              </ul>
            </div>
          )
        },
        {
          title: "Ensemble",
          desc: "Mean, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p>Instead of relying on a single prediction model, the <strong>Ensemble</strong> technique combines multiple models simultaneously to obtain more representative results and suppress uncertainty levels.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Ensemble 1 (Mean):</strong> Takes the average value of all simulated models.</li>
                <li><strong>Ensemble 2 (RMSE-Corr):</strong> Gives greater weight to models with small error rates (RMSE) and high correlation.</li>
                <li><strong>Ensemble 3 (POD-FAR):</strong> Gives greater weight to models that accurately detect rain (high POD) and minimize false alarms (low FAR).</li>
              </ul>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "Research Results",
      desc: "Key findings from model simulation and verification.",
      items: [
        {
          title: "Best Single Model",
          desc: "Correlation (r) = 0.91, RMSE = 21.23 mm",
          details: (
            <div className="space-y-4">
              <p>From 20 simulations conducted (10 using GFS data and 10 using ERA5), <strong>Member 9 of WRF-ERA5</strong> proved to be the most accurate single model.</p>
              <p>This model uses a parameterization combination of <strong>Betts-Miller-Janjic (Cumulus)</strong> and <strong>WSM 6 (Microphysics)</strong>. A correlation value of 0.91 indicates that the predicted rainfall pattern closely matches the actual event, and an error value (RMSE) of 21.23 mm is one of the lowest.</p>
            </div>
          )
        },
        {
          title: "Best Ensemble",
          desc: "Highest CSI: 0.60 (POD-FAR Weighting)",
          details: (
            <div className="space-y-4">
              <p><strong>Ensemble Technique</strong> is a method of combining several prediction models to get better results and reduce uncertainty.</p>
              <p><strong>Ensemble 3</strong> uses weighting based on how often the model correctly detects rain (POD) minus how often the model incorrectly detects rain (FAR). As a result, Ensemble 3 from ERA5 data obtained the highest CSI (Critical Success Index) score of 0.60, meaning it is highly balanced and accurate in detecting rain events without giving many false alarms.</p>
            </div>
          )
        },
        {
          title: "Optimal Bias Correction",
          desc: "Average RMSE: 25.10 mm (ERA5) & 25.95 mm (GFS)",
          details: (
            <div className="space-y-4">
              <p>Weather models often have systematic deviations, for example, tending to predict heavier rain than actual. To overcome this, <strong>Bias Correction</strong> is performed.</p>
              <p>The <strong>Linear Scaling</strong> method proved better than Quantile Mapping in this study. Linear Scaling successfully reduced error values (RMSE) consistently, making model prediction results closer to field observation data.</p>
            </div>
          )
        },
        {
          title: "Best Parameterization",
          desc: "Highly suitable for convective rain in tropical areas",
          details: (
            <div className="space-y-4">
              <p><strong>Parameterization</strong> is a method used by computer models to simplify highly complex natural processes, such as cloud formation.</p>
              <p>The combination of <strong>WSM6 (Microphysics)</strong> and <strong>Kain-Fritsch (Cumulus)</strong> appeared multiple times as the best. WSM6 is excellent because it accounts for ice particles (graupel) which play an important role in heavy rain formation in tropical areas like Lampung. Meanwhile, Kain-Fritsch is highly responsive to rapidly rising moist air.</p>
            </div>
          )
        },
        {
          title: "GFS Characteristics",
          desc: "More sensitive in detecting low-intensity rain",
          details: (
            <div className="space-y-4">
              <p><strong>GFS (Global Forecast System)</strong> is one of the global weather data used as initial model input.</p>
              <p>Based on ROC test results, models using GFS data proved more optimal and sensitive in detecting <strong>light rain (under 10 mm)</strong>. If the prediction focus is drizzle or light rain, GFS data provides better results.</p>
            </div>
          )
        },
        {
          title: "ERA5 Characteristics",
          desc: "More accurate at higher rain intensities",
          details: (
            <div className="space-y-4">
              <p><strong>ERA5</strong> is global weather data from Europe (ECMWF) which has very high resolution.</p>
              <p>Unlike GFS, models using ERA5 data show superiority in predicting <strong>moderate to heavy rain (above 10 mm)</strong>. This model is more reliable when detecting extreme weather, making it highly recommended for flood or bad weather early warning systems.</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "Data Visualization",
      desc: "Performance comparison of WRF-GFS and WRF-ERA5 models after Linear Scaling bias correction.",
      rmse: "RMSE (Root Mean Square Error)",
      rmseDesc: "The lower the RMSE value, the better the model's performance in predicting rainfall.",
      corr: "Pearson Correlation (r)",
      corrDesc: "The closer to 1, the stronger the correlation of predictions with field observation data."
    },
    gallery: {
      title: "Model Simulation Gallery",
      desc: "Visualization of simulation results from each member for GFS and ERA5 data. Click on a model to compare.",
      compare: "Compare Models",
      addCompare: "Add Model to Compare (Max 4)"
    },
    footer: {
      program: "Atmospheric and Planetary Sciences Study Program - Sumatra Institute of Technology",
      madeWith: "Made with ❤️ by",
      copyright: "Copyright © 2024. All rights reserved."
    },
    contactMe: "Contact Me"
  },
  fr: {
    nav: { title: "Projet Final" },
    hero: {
      badge: "Projet final du programme de sciences atmosphériques et planétaires",
      title: "Prévision des précipitations ITERA avec le modèle WRF et Ensemble",
      desc: "Évaluation de la précision du modèle Weather Research and Forecasting (WRF) utilisant les données GFS et ERA5 avec la technique Ensemble pour produire des prévisions de précipitations plus précises.",
      btnResult: "Voir les résultats",
      btnMethod: "Méthodologie"
    },
    methodology: {
      title: "Flux de recherche",
      desc: "Étapes du traitement des données brutes à la production de prévisions d'ensemble.",
      steps: [
        {
          title: "Données d'entrée",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>Cette recherche utilise deux types de données météorologiques mondiales comme <em>conditions initiales</em> pour le modèle :</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>GFS-FNL :</strong> Données des États-Unis (NCEP/NOAA) avec une résolution spatiale de 1,0° x 1,0°.</li>
                <li><strong>ERA5 :</strong> Données de réanalyse d'Europe (ECMWF) avec une résolution spatiale plus élevée de 0,25° x 0,25°.</li>
              </ul>
            </div>
          )
        },
        {
          title: "Modèle WRF",
          desc: "10 schémas de paramétrisation",
          details: (
            <div className="space-y-4">
              <p>Dans cette étude, <strong>10 combinaisons de schémas différentes</strong> ont été testées pour trouver les paramètres les plus adaptés aux caractéristiques météorologiques de Lampung.</p>
            </div>
          )
        },
        {
          title: "Correction de biais",
          desc: "Mise à l'échelle linéaire et cartographie des quantiles",
          details: (
            <div className="space-y-4">
              <p>La méthode de <strong>mise à l'échelle linéaire</strong> s'est avérée la plus efficace dans cette étude pour ajuster les résultats de prédiction moyens afin de s'aligner sur les données d'observation.</p>
            </div>
          )
        },
        {
          title: "Ensemble",
          desc: "Moyenne, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p>La technique <strong>Ensemble</strong> combine plusieurs modèles simultanément pour obtenir des résultats plus représentatifs et supprimer les niveaux d'incertitude.</p>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "Résultats de la recherche",
      desc: "Principales conclusions de la simulation et de la vérification du modèle.",
      items: [
        {
          title: "Meilleur modèle unique",
          desc: "Corrélation (r) = 0.91, RMSE = 21.23 mm",
          details: (
            <div className="space-y-4">
              <p>Le <strong>membre 9 de WRF-ERA5</strong> s'est avéré être le modèle unique le plus précis, utilisant la combinaison de paramétrisation Betts-Miller-Janjic et WSM 6.</p>
            </div>
          )
        },
        {
          title: "Meilleur Ensemble",
          desc: "CSI le plus élevé : 0.60",
          details: (
            <div className="space-y-4">
              <p><strong>L'Ensemble 3</strong> à partir des données ERA5 a obtenu le score CSI le plus élevé de 0,60, ce qui signifie qu'il est très équilibré et précis.</p>
            </div>
          )
        },
        {
          title: "Correction de biais optimale",
          desc: "RMSE moyenne : 25.10 mm (ERA5) & 25.95 mm (GFS)",
          details: (
            <div className="space-y-4">
              <p>La méthode de <strong>mise à l'échelle linéaire</strong> a réussi à réduire les valeurs d'erreur de manière cohérente.</p>
            </div>
          )
        },
        {
          title: "Meilleure paramétrisation",
          desc: "Très approprié pour les pluies convectives",
          details: (
            <div className="space-y-4">
              <p>La combinaison de <strong>WSM6</strong> et <strong>Kain-Fritsch</strong> est apparue plusieurs fois comme la meilleure pour les zones tropicales comme Lampung.</p>
            </div>
          )
        },
        {
          title: "Caractéristiques du GFS",
          desc: "Plus sensible aux pluies de faible intensité",
          details: (
            <div className="space-y-4">
              <p>Les modèles utilisant les données GFS se sont avérés plus optimaux pour détecter les <strong>pluies légères (moins de 10 mm)</strong>.</p>
            </div>
          )
        },
        {
          title: "Caractéristiques ERA5",
          desc: "Plus précis à des intensités de pluie plus élevées",
          details: (
            <div className="space-y-4">
              <p>Les modèles utilisant les données ERA5 montrent une supériorité dans la prévision des <strong>pluies modérées à fortes (plus de 10 mm)</strong>.</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "Visualisation des données",
      desc: "Comparaison des performances des modèles WRF-GFS et WRF-ERA5 après correction de biais.",
      rmse: "RMSE (Erreur quadratique moyenne)",
      rmseDesc: "Plus la valeur RMSE est faible, meilleures sont les performances du modèle.",
      corr: "Corrélation de Pearson (r)",
      corrDesc: "Plus on se rapproche de 1, plus la corrélation est forte."
    },
    gallery: {
      title: "Galerie de simulation de modèles",
      desc: "Visualisation des résultats de simulation de chaque membre. Cliquez sur un modèle pour comparer.",
      compare: "Comparer les modèles",
      addCompare: "Ajouter un modèle à comparer (Max 4)"
    },
    footer: {
      program: "Programme d'études en sciences atmosphériques et planétaires - Institut de technologie de Sumatra",
      madeWith: "Fait avec ❤️ par",
      copyright: "Copyright © 2024. Tous droits réservés."
    },
    contactMe: "Contactez-moi"
  },
  zh: {
    nav: { title: "毕业设计" },
    hero: {
      badge: "大气与行星科学专业毕业设计",
      title: "使用 WRF 和集成模型的 ITERA 降雨预测",
      desc: "使用 GFS 和 ERA5 数据以及集成技术评估天气研究和预报 (WRF) 模型的准确性，以产生更精确的降雨预测。",
      btnResult: "查看结果",
      btnMethod: "研究方法"
    },
    methodology: {
      title: "研究流程",
      desc: "从原始数据处理到产生集成预测的阶段。",
      steps: [
        {
          title: "数据输入",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>本研究使用两种类型的全球天气数据作为模型的<em>初始条件</em>：</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>GFS-FNL：</strong> 来自美国 (NCEP/NOAA) 的数据，空间分辨率为 1.0° x 1.0°。</li>
                <li><strong>ERA5：</strong> 来自欧洲 (ECMWF) 的再分析数据，空间分辨率更高，为 0.25° x 0.25°。</li>
              </ul>
            </div>
          )
        },
        {
          title: "WRF 模型",
          desc: "10 种参数化方案",
          details: (
            <div className="space-y-4">
              <p>在本研究中，测试了 <strong>10 种不同的方案组合</strong>，以找到最适合楠榜天气特征的设置。</p>
            </div>
          )
        },
        {
          title: "偏差校正",
          desc: "线性缩放和分位数映射",
          details: (
            <div className="space-y-4">
              <p><strong>线性缩放</strong> 方法在本研究中被证明是最有效的，它可以调整平均预测结果以与观测数据保持一致。</p>
            </div>
          )
        },
        {
          title: "集成 (Ensemble)",
          desc: "平均值, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p><strong>集成</strong> 技术同时结合多个模型以获得更具代表性的结果并抑制不确定性水平。</p>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "研究结果",
      desc: "模型模拟和验证的主要发现。",
      items: [
        {
          title: "最佳单一模型",
          desc: "相关性 (r) = 0.91, RMSE = 21.23 mm",
          details: (
            <div className="space-y-4">
              <p><strong>WRF-ERA5 的成员 9</strong> 被证明是最准确的单一模型，使用了 Betts-Miller-Janjic 和 WSM 6 的参数化组合。</p>
            </div>
          )
        },
        {
          title: "最佳集成",
          desc: "最高 CSI: 0.60",
          details: (
            <div className="space-y-4">
              <p>来自 ERA5 数据的 <strong>集成 3</strong> 获得了 0.60 的最高 CSI 分数，这意味着它在检测降雨事件时非常平衡且准确。</p>
            </div>
          )
        },
        {
          title: "最佳偏差校正",
          desc: "平均 RMSE: 25.10 mm (ERA5) & 25.95 mm (GFS)",
          details: (
            <div className="space-y-4">
              <p><strong>线性缩放</strong> 方法成功地持续降低了误差值。</p>
            </div>
          )
        },
        {
          title: "最佳参数化",
          desc: "非常适合对流雨",
          details: (
            <div className="space-y-4">
              <p><strong>WSM6</strong> 和 <strong>Kain-Fritsch</strong> 的组合多次出现作为热带地区（如楠榜）的最佳组合。</p>
            </div>
          )
        },
        {
          title: "GFS 特征",
          desc: "对低强度降雨更敏感",
          details: (
            <div className="space-y-4">
              <p>使用 GFS 数据的模型在检测 <strong>小雨（10 毫米以下）</strong> 方面被证明更优化。</p>
            </div>
          )
        },
        {
          title: "ERA5 特征",
          desc: "在较高降雨强度下更准确",
          details: (
            <div className="space-y-4">
              <p>使用 ERA5 数据的模型在预测 <strong>中到大雨（10 毫米以上）</strong> 方面显示出优势。</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "数据可视化",
      desc: "偏差校正后 WRF-GFS 和 WRF-ERA5 模型的性能比较。",
      rmse: "RMSE (均方根误差)",
      rmseDesc: "RMSE 值越低，模型预测降雨的性能越好。",
      corr: "皮尔逊相关系数 (r)",
      corrDesc: "越接近 1，预测与现场观测数据的相关性越强。"
    },
    gallery: {
      title: "模型模拟图库",
      desc: "每个成员的模拟结果可视化。点击模型进行比较。",
      compare: "比较模型",
      addCompare: "添加要比较的模型（最多 4 个）"
    },
    footer: {
      program: "大气与行星科学研究计划 - 苏门答腊理工学院",
      madeWith: "由 ❤️ 制作",
      copyright: "版权所有 © 2024。保留所有权利。"
    },
    contactMe: "联系我"
  },
  de: {
    nav: { title: "Abschlussprojekt" },
    hero: {
      badge: "Abschlussprojekt der Atmosphären- und Planetenwissenschaften",
      title: "ITERA-Niederschlagsvorhersage mit WRF & Ensemble-Modell",
      desc: "Bewertung der Genauigkeit des Weather Research and Forecasting (WRF)-Modells unter Verwendung von GFS- und ERA5-Daten mit der Ensemble-Technik.",
      btnResult: "Ergebnisse ansehen",
      btnMethod: "Methodik"
    },
    methodology: {
      title: "Forschungsablauf",
      desc: "Phasen von der Rohdatenverarbeitung bis zur Erstellung von Ensemble-Vorhersagen.",
      steps: [
        {
          title: "Dateneingabe",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>Diese Forschung verwendet zwei Arten von globalen Wetterdaten als <em>Anfangsbedingungen</em> für das Modell.</p>
            </div>
          )
        },
        {
          title: "WRF-Modell",
          desc: "10 Parametrisierungsschemata",
          details: (
            <div className="space-y-4">
              <p>In dieser Studie wurden <strong>10 verschiedene Schema-Kombinationen</strong> getestet.</p>
            </div>
          )
        },
        {
          title: "Verzerrungskorrektur",
          desc: "Lineare Skalierung & Quantil-Mapping",
          details: (
            <div className="space-y-4">
              <p>Die Methode der <strong>linearen Skalierung</strong> erwies sich in dieser Studie als am effektivsten.</p>
            </div>
          )
        },
        {
          title: "Ensemble",
          desc: "Mittelwert, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p>Die <strong>Ensemble</strong>-Technik kombiniert mehrere Modelle gleichzeitig, um repräsentativere Ergebnisse zu erzielen.</p>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "Forschungsergebnisse",
      desc: "Wichtigste Erkenntnisse aus der Modellsimulation und -verifizierung.",
      items: [
        {
          title: "Bestes Einzelmodell",
          desc: "Korrelation (r) = 0.91, RMSE = 21.23 mm",
          details: (
            <div className="space-y-4">
              <p><strong>Mitglied 9 von WRF-ERA5</strong> erwies sich als das genaueste Einzelmodell.</p>
            </div>
          )
        },
        {
          title: "Bestes Ensemble",
          desc: "Höchster CSI: 0.60",
          details: (
            <div className="space-y-4">
              <p><strong>Ensemble 3</strong> aus ERA5-Daten erzielte den höchsten CSI-Wert von 0,60.</p>
            </div>
          )
        },
        {
          title: "Optimale Verzerrungskorrektur",
          desc: "Durchschnittlicher RMSE: 25.10 mm (ERA5) & 25.95 mm (GFS)",
          details: (
            <div className="space-y-4">
              <p>Die Methode der <strong>linearen Skalierung</strong> reduzierte die Fehlerwerte erfolgreich.</p>
            </div>
          )
        },
        {
          title: "Beste Parametrisierung",
          desc: "Sehr gut geeignet für konvektiven Regen",
          details: (
            <div className="space-y-4">
              <p>Die Kombination aus <strong>WSM6</strong> und <strong>Kain-Fritsch</strong> erwies sich als die beste.</p>
            </div>
          )
        },
        {
          title: "GFS-Eigenschaften",
          desc: "Empfindlicher bei Regen geringer Intensität",
          details: (
            <div className="space-y-4">
              <p>Modelle mit GFS-Daten erwiesen sich als optimaler bei der Erkennung von <strong>leichtem Regen (unter 10 mm)</strong>.</p>
            </div>
          )
        },
        {
          title: "ERA5-Eigenschaften",
          desc: "Genauer bei höheren Regenintensitäten",
          details: (
            <div className="space-y-4">
              <p>Modelle mit ERA5-Daten zeigen eine Überlegenheit bei der Vorhersage von <strong>mäßigem bis starkem Regen (über 10 mm)</strong>.</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "Datenvisualisierung",
      desc: "Leistungsvergleich der WRF-GFS- und WRF-ERA5-Modelle nach der Verzerrungskorrektur.",
      rmse: "RMSE (Root Mean Square Error)",
      rmseDesc: "Je niedriger der RMSE-Wert, desto besser ist die Leistung des Modells.",
      corr: "Pearson-Korrelation (r)",
      corrDesc: "Je näher an 1, desto stärker ist die Korrelation."
    },
    gallery: {
      title: "Modellsimulations-Galerie",
      desc: "Visualisierung der Simulationsergebnisse jedes Mitglieds. Klicken Sie auf ein Modell, um es zu vergleichen.",
      compare: "Modelle vergleichen",
      addCompare: "Modell zum Vergleichen hinzufügen (Max 4)"
    },
    footer: {
      program: "Studiengang Atmosphären- und Planetenwissenschaften - Sumatra Institute of Technology",
      madeWith: "Mit ❤️ gemacht von",
      copyright: "Copyright © 2024. Alle Rechte vorbehalten."
    },
    contactMe: "Kontaktiere mich"
  },
  ru: {
    nav: { title: "Дипломный проект" },
    hero: {
      badge: "Дипломный проект по атмосферным и планетным наукам",
      title: "Прогнозирование осадков ITERA с помощью модели WRF и Ensemble",
      desc: "Оценка точности модели Weather Research and Forecasting (WRF) с использованием данных GFS и ERA5 с помощью метода Ensemble.",
      btnResult: "Посмотреть результаты",
      btnMethod: "Методология"
    },
    methodology: {
      title: "Ход исследования",
      desc: "Этапы от обработки сырых данных до получения ансамблевых прогнозов.",
      steps: [
        {
          title: "Ввод данных",
          desc: "GFS-FNL & ERA5",
          details: (
            <div className="space-y-4">
              <p>В этом исследовании используются два типа глобальных метеорологических данных в качестве <em>начальных условий</em> для модели.</p>
            </div>
          )
        },
        {
          title: "Модель WRF",
          desc: "10 схем параметризации",
          details: (
            <div className="space-y-4">
              <p>В этом исследовании были протестированы <strong>10 различных комбинаций схем</strong>.</p>
            </div>
          )
        },
        {
          title: "Коррекция смещения",
          desc: "Линейное масштабирование и квантильное отображение",
          details: (
            <div className="space-y-4">
              <p>Метод <strong>линейного масштабирования</strong> оказался наиболее эффективным в этом исследовании.</p>
            </div>
          )
        },
        {
          title: "Ансамбль",
          desc: "Среднее, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p>Метод <strong>Ensemble</strong> объединяет несколько моделей одновременно для получения более репрезентативных результатов.</p>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "Результаты исследования",
      desc: "Основные выводы из моделирования и верификации модели.",
      items: [
        {
          title: "Лучшая одиночная модель",
          desc: "Корреляция (r) = 0.91, RMSE = 21.23 мм",
          details: (
            <div className="space-y-4">
              <p><strong>Член 9 WRF-ERA5</strong> оказался наиболее точной одиночной моделью.</p>
            </div>
          )
        },
        {
          title: "Лучший ансамбль",
          desc: "Самый высокий CSI: 0.60",
          details: (
            <div className="space-y-4">
              <p><strong>Ансамбль 3</strong> на основе данных ERA5 получил наивысший балл CSI 0,60.</p>
            </div>
          )
        },
        {
          title: "Оптимальная коррекция смещения",
          desc: "Средний RMSE: 25.10 мм (ERA5) & 25.95 мм (GFS)",
          details: (
            <div className="space-y-4">
              <p>Метод <strong>линейного масштабирования</strong> успешно снизил значения ошибок.</p>
            </div>
          )
        },
        {
          title: "Лучшая параметризация",
          desc: "Очень подходит для конвективных дождей",
          details: (
            <div className="space-y-4">
              <p>Комбинация <strong>WSM6</strong> и <strong>Kain-Fritsch</strong> оказалась лучшей.</p>
            </div>
          )
        },
        {
          title: "Характеристики GFS",
          desc: "Более чувствителен к дождям низкой интенсивности",
          details: (
            <div className="space-y-4">
              <p>Модели, использующие данные GFS, оказались более оптимальными при обнаружении <strong>небольшого дождя (менее 10 мм)</strong>.</p>
            </div>
          )
        },
        {
          title: "Характеристики ERA5",
          desc: "Более точный при высокой интенсивности дождя",
          details: (
            <div className="space-y-4">
              <p>Модели, использующие данные ERA5, демонстрируют превосходство в прогнозировании <strong>умеренных и сильных дождей (более 10 мм)</strong>.</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "Визуализация данных",
      desc: "Сравнение производительности моделей WRF-GFS и WRF-ERA5 после коррекции смещения.",
      rmse: "RMSE (Среднеквадратичная ошибка)",
      rmseDesc: "Чем ниже значение RMSE, тем лучше производительность модели.",
      corr: "Корреляция Пирсона (r)",
      corrDesc: "Чем ближе к 1, тем сильнее корреляция."
    },
    gallery: {
      title: "Галерея моделирования",
      desc: "Визуализация результатов моделирования каждого члена. Нажмите на модель для сравнения.",
      compare: "Сравнить модели",
      addCompare: "Добавить модель для сравнения (Макс 4)"
    },
    footer: {
      program: "Учебная программа по атмосферным и планетным наукам - Суматранский технологический институт",
      madeWith: "Сделано с ❤️",
      copyright: "Авторское право © 2024. Все права защищены."
    },
    contactMe: "Свяжитесь со мной"
  },
  hi: {
    nav: { title: "अंतिम परियोजना" },
    hero: {
      badge: "वायुमंडलीय और ग्रहीय विज्ञान का अंतिम प्रोजेक्ट",
      title: "WRF और एन्सेम्बल मॉडल के साथ ITERA वर्षा की भविष्यवाणी",
      desc: "अधिक सटीक वर्षा की भविष्यवाणी करने के लिए एन्सेम्बल तकनीक के साथ GFS और ERA5 डेटा का उपयोग करके मौसम अनुसंधान और पूर्वानुमान (WRF) मॉडल सटीकता का मूल्यांकन।",
      btnResult: "परिणाम देखें",
      btnMethod: "कार्यप्रणाली"
    },
    methodology: {
      title: "अनुसंधान कार्यप्रवाह",
      desc: "कच्चे डेटा प्रसंस्करण से लेकर एन्सेम्बल भविष्यवाणियां तैयार करने तक के चरण।",
      steps: [
        {
          title: "डेटा इनपुट",
          desc: "GFS-FNL और ERA5",
          details: (
            <div className="space-y-4">
              <p>यह शोध मॉडल के लिए <em>प्रारंभिक स्थितियों</em> के रूप में दो प्रकार के वैश्विक मौसम डेटा का उपयोग करता है।</p>
            </div>
          )
        },
        {
          title: "WRF मॉडल",
          desc: "10 पैरामीटराइजेशन योजनाएं",
          details: (
            <div className="space-y-4">
              <p>इस अध्ययन में, <strong>10 अलग-अलग योजना संयोजनों</strong> का परीक्षण किया गया था।</p>
            </div>
          )
        },
        {
          title: "पूर्वाग्रह सुधार",
          desc: "रैखिक स्केलिंग और क्वांटाइल मैपिंग",
          details: (
            <div className="space-y-4">
              <p><strong>रैखिक स्केलिंग</strong> विधि इस अध्ययन में सबसे प्रभावी साबित हुई।</p>
            </div>
          )
        },
        {
          title: "एन्सेम्बल",
          desc: "माध्य, RMSE-Corr, POD-FAR",
          details: (
            <div className="space-y-4">
              <p><strong>एन्सेम्बल</strong> तकनीक अधिक प्रतिनिधि परिणाम प्राप्त करने के लिए एक साथ कई मॉडलों को जोड़ती है।</p>
            </div>
          )
        }
      ]
    },
    bento: {
      title: "अनुसंधान परिणाम",
      desc: "मॉडल सिमुलेशन और सत्यापन से प्रमुख निष्कर्ष।",
      items: [
        {
          title: "सर्वश्रेष्ठ एकल मॉडल",
          desc: "सहसंबंध (r) = 0.91, RMSE = 21.23 मिमी",
          details: (
            <div className="space-y-4">
              <p><strong>WRF-ERA5 का सदस्य 9</strong> सबसे सटीक एकल मॉडल साबित हुआ।</p>
            </div>
          )
        },
        {
          title: "सर्वश्रेष्ठ एन्सेम्बल",
          desc: "उच्चतम CSI: 0.60",
          details: (
            <div className="space-y-4">
              <p>ERA5 डेटा से <strong>एन्सेम्बल 3</strong> ने 0.60 का उच्चतम CSI स्कोर प्राप्त किया।</p>
            </div>
          )
        },
        {
          title: "इष्टतम पूर्वाग्रह सुधार",
          desc: "औसत RMSE: 25.10 मिमी (ERA5) और 25.95 मिमी (GFS)",
          details: (
            <div className="space-y-4">
              <p><strong>रैखिक स्केलिंग</strong> विधि ने त्रुटि मानों को सफलतापूर्वक कम किया।</p>
            </div>
          )
        },
        {
          title: "सर्वश्रेष्ठ पैरामीटराइजेशन",
          desc: "संवहनी बारिश के लिए अत्यधिक उपयुक्त",
          details: (
            <div className="space-y-4">
              <p><strong>WSM6</strong> और <strong>Kain-Fritsch</strong> का संयोजन सबसे अच्छा साबित हुआ।</p>
            </div>
          )
        },
        {
          title: "GFS विशेषताएं",
          desc: "कम तीव्रता वाली बारिश का पता लगाने में अधिक संवेदनशील",
          details: (
            <div className="space-y-4">
              <p>GFS डेटा का उपयोग करने वाले मॉडल <strong>हल्की बारिश (10 मिमी से कम)</strong> का पता लगाने में अधिक इष्टतम साबित हुए।</p>
            </div>
          )
        },
        {
          title: "ERA5 विशेषताएं",
          desc: "उच्च बारिश की तीव्रता पर अधिक सटीक",
          details: (
            <div className="space-y-4">
              <p>ERA5 डेटा का उपयोग करने वाले मॉडल <strong>मध्यम से भारी बारिश (10 मिमी से ऊपर)</strong> की भविष्यवाणी करने में श्रेष्ठता दिखाते हैं।</p>
            </div>
          )
        }
      ]
    },
    charts: {
      title: "डेटा विज़ुअलाइज़ेशन",
      desc: "पूर्वाग्रह सुधार के बाद WRF-GFS और WRF-ERA5 मॉडल के प्रदर्शन की तुलना।",
      rmse: "RMSE (रूट मीन स्क्वायर एरर)",
      rmseDesc: "RMSE मान जितना कम होगा, मॉडल का प्रदर्शन उतना ही बेहतर होगा।",
      corr: "पियर्सन सहसंबंध (r)",
      corrDesc: "1 के जितना करीब होगा, सहसंबंध उतना ही मजबूत होगा।"
    },
    gallery: {
      title: "मॉडल सिमुलेशन गैलरी",
      desc: "प्रत्येक सदस्य से सिमुलेशन परिणामों का विज़ुअलाइज़ेशन। तुलना करने के लिए एक मॉडल पर क्लिक करें।",
      compare: "मॉडल की तुलना करें",
      addCompare: "तुलना करने के लिए मॉडल जोड़ें (अधिकतम 4)"
    },
    footer: {
      program: "वायुमंडलीय और ग्रहीय विज्ञान अध्ययन कार्यक्रम - सुमात्रा प्रौद्योगिकी संस्थान",
      madeWith: "❤️ द्वारा निर्मित",
      copyright: "कॉपीराइट © 2024. सर्वाधिकार सुरक्षित।"
    },
    contactMe: "मुझसे संपर्क करें"
  }
};
