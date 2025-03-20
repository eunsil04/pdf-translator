"use client";

import { useState, DragEvent } from "react";
import styles from "./page.module.css";

export default function Page() {
  const [isFile, setIsFile] = useState(true);   // File / Link 선택
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [linkValue, setLinkValue] = useState("");
  const [preview, setPreview] = useState<string>(""); // 간단히 파일명 미리보기 등

  // 드래그앤드롭 관련 이벤트
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      setPreview(file.name);
    }
  };

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setUploadedFile(file);
    setPreview(file.name);
  };

  return (
    <main className={styles.container}>
      {/* 헤더 부분 */}
      <h1 className={styles.title}>PDFMathTranslate iSW_캡스톤 페이지</h1>

      {/* 파일/링크 선택 */}
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="type"
            checked={isFile}
            onChange={() => setIsFile(true)}
          />
          <span>File</span>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="type"
            checked={!isFile}
            onChange={() => setIsFile(false)}
          />
          <span>Link</span>
        </label>
      </div>

      {/* 업로드 구역 */}
      {isFile ? (
        <div>
          <p style={{ marginBottom: "0.5rem", color: "#FEEEEB", fontSize: "0.875rem" }}>
            File &lt; 5 MB
          </p>
          <div
            className={styles.dragArea}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <p>{uploadedFile.name}</p>
            ) : (
              <div>
                <p>파일을 끌어 놓으세요</p>
                <p>혹은 파일을 업로드하세요</p>
                <input
                  type="file"
                  className={styles.hiddenInput}
                  id="fileUpload"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className={styles.uploadLabel}>
                  업로드
                </label>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.linkInputContainer}>
          <label className={styles.linkLabel}>Link URL</label>
          <input
            type="text"
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            placeholder="https://example.com/document.pdf"
            className={styles.linkInput}
          />
        </div>
      )}

      {/* Preview 영역 */}
      <div className={styles.previewContainer}>
        <h2 className={styles.previewTitle}>Document Preview</h2>
        {preview ? (
          <p>{preview}</p>
        ) : (
          <p className={styles.previewText}>미리보기할 파일이 없습니다.</p>
        )}
      </div>

      {/* 옵션들 */}
      <div className={styles.optionContainer}>
        <h3 className={styles.optionTitle}>Option</h3>
        <div className={styles.optionRow}>
          <div className={styles.optionColumn}>
            <label className={styles.optionLabel}>Service</label>
            <select className={styles.optionSelect}>
              <option value="google">Google</option>
              <option value="openai">OpenAI</option>
            </select>
          </div>

          <div className={styles.optionColumn}>
            <label className={styles.optionLabel}>Translate from</label>
            <select className={styles.optionSelect}>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div className={styles.optionColumn}>
            <label className={styles.optionLabel}>Translate to</label>
            <select className={styles.optionSelect}>
              <option value="en">English</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
            </select>
          </div>

          <div className={styles.optionColumn}>
            <label className={styles.optionLabel}>Pages</label>
            <select className={styles.optionSelect}>
              <option value="1">First 1 page</option>
              <option value="2">First 2 pages</option>
              <option value="5">First 5 pages</option>
            </select>
          </div>
        </div>
      </div>

      {/* 번역 버튼 */}
      <button
        className={styles.translateButton}
        onClick={() => {
          alert("Translate 버튼 클릭!");
        }}
      >
        Translate
      </button>
    </main>
  );
}