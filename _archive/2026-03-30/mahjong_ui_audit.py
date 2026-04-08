import cv2
import numpy as np
import json
import sys
import os

def calibrate_mahjong_ui(image_path):
    # 1. 讀取截圖
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Cannot read {image_path}")
        return None
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 2. 邊緣檢測 (專門找麻將牌的矩形輪廓)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)
    
    # 3. 尋找輪廓
    contours, _ = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    detected_tiles = []
    
    for cnt in contours:
        # 近似多邊形
        peri = cv2.arcLength(cnt, True)
        approx = cv2.approxPolyDP(cnt, 0.04 * peri, True)
        
        # 如果是四邊形，且面積符合牌的大小範圍
        if len(approx) == 4:
            x, y, w, h = cv2.boundingRect(approx)
            aspect_ratio = w / float(h)
            
            # 廣東麻雀牌比例約為 0.75 (3:4)
            if 0.5 < aspect_ratio < 1.0 and w * h > 500:
                detected_tiles.append({
                    "center": [int(x + w/2), int(y + h/2)],
                    "size": [w, h],
                    "box": [x, y, w, h]
                })
                # 畫出來做視覺回饋
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # 4. 輸出座標給 OpenClaw 分析
    result = {
        "count": len(detected_tiles),
        "tiles": detected_tiles,
        "canvas_size": [img.shape[1], img.shape[0]]
    }
    
    with open('ui_audit.json', 'w') as f:
        json.dump(result, f, indent=2)
    
    cv2.imwrite('debug_vision.png', img)
    print(f"Detected {len(detected_tiles)} tiles. Data saved to ui_audit.json")
    
    return result

if __name__ == "__main__":
    image_path = sys.argv[1] if len(sys.argv) > 1 else 'screenshot.png'
    result = calibrate_mahjong_ui(image_path)
    if result:
        print(f"Audit Result: {result['count']} tiles detected")
